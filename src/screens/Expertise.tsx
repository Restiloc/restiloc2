import { Alert, Dimensions, View, StyleSheet, ScrollView, Text, ActivityIndicator, RefreshControl, TextInput, Image, TouchableOpacity } from "react-native";
import Colors from "src/Colors";
import Header from "src/components/Header";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import type { MissionType, PrestationEditType, PrestationType } from "src/Types";
import { useCallback, useEffect, useState, useRef } from "react";
import SoftButton from "src/components/SoftButton";
import Button from "src/components/Button";
import Prestation from "src/components/Prestation";
import Modal from "react-native-modal";
import * as ImagePicker from "react-native-image-picker";
import { editPrestation, newPrestation, removePrestation } from "src/services/api/Prestations";
import { closeMission, getMission } from "src/services/api/Missions";
import Network from "src/services/Network";
import Storage from "src/services/Storage";
import { format } from "src/Constants";
import DropdownSelect from "react-native-input-select";
import { getStatus } from "src/services/api/Status";
import { State } from "react-native-webview/lib/WebViewTypes";
import { editVehicle } from "src/services/api/Vehicles";
import Signature from "react-native-signature-canvas";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const { height } = Dimensions.get("window");	
	
type Props = {
	navigation: any;
	route: {
		params: {
			mission: MissionType;
		}
	}
}

/**
 * This the page to realize an expertise of a vehicle of a specific mission.
 * 
 * @param navigation - The navigation of the app.
 * @param route - The route of the app with needed parameters.
 * @returns {JSX.Element} Rendered statistics page.
 */
export default function Expertise({ navigation, route }: Props): JSX.Element {

	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [prestations, setPrestations] = useState<PrestationType[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [closeModalVisible, setCloseModalVisible] = useState(false);
	const [statuses, setStatuses] = useState<State[]>([]);
	const [selectedStatus, setSelectedStatus] = useState<string>("");
	const [currentPrestationDetails, setCurrentPrestationDetails] = useState<PrestationType>({} as PrestationType);
	const [showImage, setShowImage] = useState(false);
	const [error, setError] = useState(false);
	let [update, setUpdate] = useState(true);

	let bouncyCheckboxRef: BouncyCheckbox | null = null;
	const [sign, setSign] = useState<String>("");
  const [expertSign, setExpertSign] = useState(false);

	const { mission } = route.params;

	useEffect(() => {
		setLoading(true);
		(async () => {
			let network = await Network.isOk();
			if (!network) return;
			console.log(`Update called => ${update}`)
			let m: MissionType|boolean = await getMission(mission.id);
			let status = await getStatus();
			if (status) {
				setStatuses(status);
			}
			if (m) {
				console.log(m.pree);
				setPrestations(m.pree);
				setLoading(false);
			}
		})()
	}, [update])

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setUpdate(!update);
		setTimeout(() => {
			setRefreshing(false);
		}, 250);
	}, []);

	const launchCamera = () => {
		ImagePicker.launchCamera({
			mediaType: 'photo',
			presentationStyle: 'pageSheet',
			includeBase64: true,
			quality: 0.4,
			maxWidth: 800,
			maxHeight: 800,
		}, (response) => {
			if (response.didCancel) {
        console.log('User cancelled image picker by pressing back button');
			} else if (response.errorCode) {
				console.log("error code", response.errorCode)
      } else if (response.errorMessage) {
				console.log('error message', response.errorMessage)
      } else {
				if (response && response.assets){
					setCurrentPrestationDetails({ ...currentPrestationDetails, image: response.assets[0].base64 ?? "" });
					setShowImage(true);
				}
			}
		});
	}

	function reset () {
		setShowImage(false);
		setError(false)
		setCurrentPrestationDetails({} as PrestationType);
		setModalVisible(!modalVisible);
	}

	async function submit () {
		if (!currentPrestationDetails.label || !currentPrestationDetails.description) {
			setError(true);
			return;
		}
		let network = await Network.isOk();
		if (network) {
			await newPrestation({
				mission_id: mission.id,						
				...currentPrestationDetails
			});
		} else {
			console.log(`No network, saving prestation for mission #${mission.id} in storage`);
			Storage.save({
				type: "prestations",
				mission_id: mission.id,
				prestation: currentPrestationDetails
			});
		}
		setUpdate(!update);
		reset();
	}

	function close () {
		console.log(`Signature => ${sign}, expertSign => ${expertSign}`)
		if (!isSigned()) {	
			Alert.alert("Attention!", "Veuillez apposer et valider votre signature.");
			return;
		}
		(async () => {
			let network = await Network.isOk();
			if (network) {
				if (selectedStatus === "") {
					Alert.alert("Attention!", "Veuillez sélectionner un statut.");
					return;
				} else {
					await editVehicle(mission.vehicle.id, {
						vehicle_state_id: selectedStatus
					})
					await closeMission(mission.id.toString(), {
						signature: sign,
						signedByClient: !expertSign,
					});
				}
			} else {
				Storage.save({
					type: "closedMissions",
					mission_id: mission.id,
					signature: sign,
					signedByClient: !expertSign
				});
			}
			navigation.navigate("planning", {
				closedMission: {
					state: true,
					id: mission.id.toString()
				}
			});
		})()
	}

	function showModal () {
		reset();
		setModalVisible(!modalVisible);
	}
	
	function showCloseModal () {
		setCloseModalVisible(!closeModalVisible);
		setSign("");
		setExpertSign(false)
	}

	const isSigned = () => {
		return sign.length > 0;
	}

	async function onDelete(id: number = 0) {
		if (id) {
			await removePrestation(id);
			setUpdate(!update);
		}
	}

	async function onEdit(id: number, body: PrestationEditType) {
		if (id) {
			await editPrestation(id, body);
			setUpdate(!update);
		}
	}

	return (
		<View style={styles.view}>
			<Header />
			<ScrollView refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
				<View style={styles.card}>
					<Text style={styles.text}>Mission #{mission?.id}</Text>
					<Text style={styles.text}>{format.hourly(mission)}</Text>
				</View>
				<View>
					{ loading ? (
							<ActivityIndicator size="large" color={Colors.Secondary} />
						) : (
							<View style={styles.prestations}>
								<Text style={styles.title}>Prestations de service</Text>
								{
									prestations.length > 0 ? (
										prestations.map((prestation, index) => (
											<Prestation 
												key={index} 
												prestation={prestation} 
												isFinished={mission.isFinished} 
												onDelete={onDelete} 
												onEdit={onEdit}
											/>
										))
									) : (
										<Text style={[styles.text, styles.details]}>Aucune prestation de service n'a été saisie.</Text>
									)
								}
							</View>
						) 
					}
				</View>
				{
					mission.isFinished ? (
						<></>
					) : (
						<>
							<SoftButton title="Ajouter une prestation" onPress={showModal} css={{ marginTop: 20 }}/>
							
							<View style={{
								marginTop: 40,
								alignItems: "center",
							}}>
								<Text style={styles.title}>État du véhicule</Text>
									<DropdownSelect
										isMultiple={false}
										isSearchable={false}
										dropdownContainerStyle={{ width: 300 }}
										checkboxLabelStyle={{ color: "black" }}
										placeholder="Sélectionnez un motif"
										options={statuses}
										optionLabel={'label'}
										optionValue={'id'}
										onValueChange={(text: string) => { setSelectedStatus(text) }}
										primaryColor={'green'}
									/>
							</View>
							
							
							<View style={styles.container}>
								<Button title="Clôturer la mission" onPress={showCloseModal} />
							</View>
						</>
					)
				}
			</ScrollView>
			<Modal 
					isVisible={modalVisible}
					onBackdropPress={showModal}
					onBackButtonPress={showModal}
					style={{ height: 300 }}
			>
				<View style={styles.modal}>
					<View style={styles.form}>
						{
							error ? (
								<Text style={styles.error}>Veuillez remplir tous les champs</Text>
							) : (
								<></>
							)
						}
						<Text style={styles.label}>Titre</Text>
						<TextInput style={styles.input} onChangeText={text => setCurrentPrestationDetails({...currentPrestationDetails, label: text})}/>
						<Text style={styles.label}>Description</Text>
						<TextInput style={styles.input} onChangeText={text => setCurrentPrestationDetails({...currentPrestationDetails, description: text})}/>
						<TouchableOpacity onPress={launchCamera} style={{marginTop: 12}}>
							<Text style={styles.label}>Joindre une photo</Text>
						</TouchableOpacity>
						{
							showImage ? (
								<Image source={{ uri: `data:image/png;base64,${currentPrestationDetails.image}` }} style={{ marginTop: 20, width: 150, height: 150 }} />
							) : (
								<></>
							)
						}
					</View>
					<SoftButton title="Créer la prestation" onPress={submit} css={{marginTop: 2}}/>
					<SoftButton title="Annuler" onPress={showModal} css={{marginTop: 2}}/>
				</View>
			</Modal>
			<Modal 
					isVisible={closeModalVisible} 
					onBackdropPress={showCloseModal}
					onBackButtonPress={showCloseModal}
					style={{ height: 300 }}
			>
				<ScrollView 
					style={styles.scrollViewModal} 
					scrollEnabled={false}
				>
					<Text style={styles.title}>Signature</Text>
					<View style={styles.sign}>
						<Signature
							onOK={(img) => setSign(img.split(",")[1])}
							descriptionText=""
							clearText="Effacer"
							onClear={() => {
								setSign("");
							}}
							confirmText="Valider"
							imageType="image/png"
							dataURL="base64"
							minWidth={2}
							maxWidth={2}
						/>
					</View>
					<BouncyCheckbox
							style={{ marginTop: 16, marginBottom: 16 }}
							ref={(ref: any) => (bouncyCheckboxRef = ref)}
							isChecked={expertSign}
							fillColor={Colors.Secondary}
							text="Signature de l'expert"
							disableBuiltInState
							textStyle={{
								textDecorationLine: "none",
							}}
							onPress={() => setExpertSign(!expertSign)}
						/>
					<SoftButton 
						title="Clôturer l'expertise" 
						onPress={close} 
						css={{marginTop: 2}}
						disabled={!isSigned()}
					/>
					<SoftButton title="Annuler" onPress={showCloseModal} css={{marginTop: 2 }}/>
				</ScrollView>
			</Modal>
			<Arrow direction={Directions.Left} position={Positions.Left} onPress={() => navigation.goBack()} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: height,
		backgroundColor: Colors.Primary
	},
	card: {
		color: "black",
		backgroundColor: Colors.Mission,
		height: 100,
		marginTop: 20,
		marginBottom: 20,
		borderColor: Colors.Details,
		borderWidth: 1,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	prestations: {
		marginLeft: 12,
		marginRight: 12,
	},
	text: {
		fontSize: 16,
		color: Colors.Details,
	},
	details: {
		fontSize: 14,
	},
	title: {
		fontSize: 24,
		color: Colors.Details,
		fontWeight: "bold",
		marginBottom: 16,
	},
	container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 16,
	},
	sign: {
		height: 355,
	},
	modal: {
		backgroundColor: Colors.Primary,
		padding: 20,
		borderRadius: 10,
		alignItems: "center"
	},
	scrollViewModal: {
		backgroundColor: Colors.Primary,
		padding: 20,
		borderRadius: 10,
		maxHeight: 660
	},
	input: {
		borderWidth: 1,
		minWidth: 250,
		borderRadius: 10,
		color: "black",
		padding: 10,
	},
	label: {
		color: "black",
		fontSize: 16,
		alignSelf: "flex-start",
		marginTop: 20,
		marginBottom: 6,
	},
	form: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 50,
	},
	error: {
		color: "black",
		backgroundColor: Colors.Error,
		padding: 10,
		width: 250,
		textAlign: "center",
		marginBottom: 20,
		borderRadius: 10,
	}
});