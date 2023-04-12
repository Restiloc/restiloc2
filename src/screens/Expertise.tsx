import { Dimensions, View, StyleSheet, ScrollView, Text, ActivityIndicator, RefreshControl, TextInput, Image, TouchableOpacity } from "react-native";
import Colors from "src/Colors";
import Header from "src/components/Header";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import type { MissionType, PrestationType } from "src/Types";
import { useCallback, useEffect, useState } from "react";
import SoftButton from "src/components/SoftButton";
import Button from "src/components/Button";
import Prestation from "src/components/Prestation";
import Modal from "react-native-modal";
// import * as ImagePicker from "react-native-image-picker";
import { newPrestation } from "src/services/api/Prestations";
import { closeMission } from "src/services/api/Missions";

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
	const [currentPrestationDetails, setCurrentPrestationDetails] = useState<PrestationType>({} as PrestationType);
	const [showImage, setShowImage] = useState(false);
	const { mission } = route.params;

	useEffect(() => {
		setLoading(false);
	}, [])

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setLoading(true);
		setTimeout(() => {
			setRefreshing(false);
			setLoading(false);
		}, 250);
	}, []);

	const format = {
		hourly: () => {
			let date = (mission?.dateMission ?? "").split("-").reverse().join("/"),
				time = (mission?.startedAt ?? "").split(":").slice(0, 2).join("h");
			if (!date || !time) return "Date inconnue";
			return `le ${date} à ${time}`
		}
	}

	// const launchCamera = () => {
	// 	ImagePicker.launchCamera({
	// 		mediaType: 'photo',
	// 		presentationStyle: 'pageSheet',
	// 		includeBase64: true,
	// 		quality: 0.4,
	// 		maxWidth: 800,
	// 		maxHeight: 800,
	// 	}, (response) => {
	// 		if (response.didCancel) {
  //       console.log('User cancelled image picker by pressing back button');
	// 		} else if (response.errorCode) {
	// 			console.log("error code", response.errorCode)
  //     } else if (response.errorMessage) {
	// 			console.log('error message', response.errorMessage)
  //     } else {
	// 			if (response && response.assets){
	// 				setCurrentPrestationDetails({ ...currentPrestationDetails, image: response.assets[0].base64 ?? "", signature: "tmp" });
	// 				setShowImage(true);
	// 			}
	// 		}
	// 	});
	// }

	function reset () {
		setShowImage(false);
		setCurrentPrestationDetails({} as PrestationType);
		setModalVisible(!modalVisible);
	}

	function submit () {
		setPrestations([...prestations, currentPrestationDetails]);
		reset();
	}

	function close () {
		(async () => {
			if (prestations.length > 0) {
				for (let prestation of prestations) {
					await newPrestation({
						mission_id: mission.id,						
						...prestation
					});
				}
			}
			await closeMission(mission.id.toString());
			navigation.navigate("planning");
		})()
	}

	function showModal () {
		reset();
		setModalVisible(!modalVisible);
	}

	return (
		<View style={styles.view}>
			<Header />
			<ScrollView refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
				<View style={styles.card}>
					<Text style={styles.text}>Mission #{mission?.id}</Text>
					<Text style={styles.text}>{format.hourly()}</Text>
				</View>
				<View>
					{ loading ? ( 
							<ActivityIndicator size="large" color={Colors.Secondary} />
						) : (
							<View style={styles.prestations}>
								<Text style={styles.title}>Prestations de service</Text>
								{
									mission.pree.length <= 0 && prestations.length <= 0 ? (
										<Text style={[styles.text, styles.details]}>Aucune prestation de service n'a été saisie.</Text>
									) : (
										mission.pree.map((prestation, index) => (
											<Prestation key={index} prestation={prestation} />
										))
									)
								}
								{
									prestations.length > 0 ? (
											prestations.map((prestation, index) => (
												<Prestation key={index} prestation={prestation} />
											))
										) : (<></>)
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
							<SoftButton title="Ajouter une prestation" onPress={showModal} css={{marginTop: 20}}/>
							<View style={styles.container}>
								<Button title="Clôturer l'expertise" onPress={close} />
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
					{/* <Text style={{ color: "black", fontSize: 30, textAlign: "center", marginBottom: 60, marginTop: 60, fontWeight: "bold" }}>
						En cours de développement...
					</Text>
					<SoftButton title="Fermer" onPress={() => { setModalVisible(!modalVisible) }} /> */}
					<View style={styles.form}>
						<Text style={styles.label}>Titre</Text>
						<TextInput style={styles.input} onChangeText={text => setCurrentPrestationDetails({...currentPrestationDetails, label: text})}/>
						<Text style={styles.label}>Description</Text>
						<TextInput style={styles.input} onChangeText={text => setCurrentPrestationDetails({...currentPrestationDetails, description: text})}/>
						{/* <TouchableOpacity onPress={launchCamera} style={{marginTop: 12}}>
							<Text style={styles.label}>Joindre une photo</Text>
						</TouchableOpacity>
						{
							showImage ? (
								<Image source={{ uri: `data:image/png;base64,${currentPrestationDetails.image}` }} style={{ marginTop: 20, width: 150, height: 150 }} />
							) : (
								<></>
							)
						} */}
					</View>
					<SoftButton title="Ajouter une prestation" onPress={submit} css={{marginTop: 2}}/>
					<SoftButton title="Annuler" onPress={showModal} css={{marginTop: 2}}/>
				</View>
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
	modal: {
		backgroundColor: Colors.Primary,
		padding: 20,
		borderRadius: 10,
		alignItems: "center"
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
	}
});