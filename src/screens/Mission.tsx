import { Dimensions, ScrollView, StyleSheet, View, Image, Text, ActivityIndicator, RefreshControl } from "react-native";
import Storage from "src/services/Storage";
import { useEffect, useState, useContext, useCallback } from "react";
import Header from "src/components/Header";
import { AuthContext } from "../../App";
import type { Client, Garage, MissionType } from "../Types";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import Colors from "src/Colors";
import Button from "src/components/Button";
import SoftButton from "src/components/SoftButton";
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");

type Props = {
	navigation: any;
	route: {
		params: {
			id: string;
			route: string;
			mission: MissionType;
			// coordinates: {
			// 	latitude: number;
			// 	longitude: number;
			// 	title: string;
			// };
		}
	};
}

/**
 * This is the page to view some details of a mission.
 * 
 * @param navigation - The navigation of the app.
 * @param route - The route of the app with needed parameters.
 * @returns {JSX.Element} Rendered mission page.
 */
export default function Mission({ navigation, route }: Props): JSX.Element {

	const [loading, setLoading] = useState(true);
	const [isClient, setIsClient] = useState(false);
	const [mission, setMission] = useState<MissionType>();
	const [refreshing, setRefreshing] = useState(false);
	// const [showSign, setShowSign] = useState(false);
	const endpoint = route.params.route;
	// const coordinates = route.params.coordinates;

	// @ts-ignore
	const { signOut } = useContext(AuthContext);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	useEffect(() => {
		(async () => {
			let token = await Storage.get("token");
			fetch(`${endpoint}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `Bearer ${token}`
				}
			}).then((response) => {
				if (!response.ok) {
					setMission(route.params.mission);
				}
				return response.json()
			})
				.then((data: MissionType) => {
					if (data.message === "Unauthenticated.") {
						console.log("Token is invalid. Redirecting to login page.")
						signOut();
						return;
					}
					setMission(data);
					if (data.client !== null) setIsClient(true)
					setLoading(false);
				})
		})()
	}, [refreshing])

	const format = {
		address: () => {
			let type: Garage | Client | undefined = isClient ? mission?.client : mission?.garage;
			if (type === undefined) return "Adresse inconnue";
			return `${type?.addressNumber} ${type?.street}, ${type?.postalCode} ${type?.city}`
		},
		hourly: () => {
			let date = (mission?.dateMission ?? "").split("-").reverse().join("/"),
				time = (mission?.startedAt ?? "").split(":").slice(0, 2).join("h");
			if (!date || !time) return "Date inconnue";
			return `le ${date} à ${time}`
		}
	}

	function toExpertise() {
		navigation.navigate("expertise", {
			mission: mission
		});
	}

	function toHistory() {
		navigation.navigate("history", {
			endpoint: mission?.vehicle.route,
			vehicle: mission?.vehicle
		});
	}

	function toUnavailable() {
		navigation.navigate("unavailable", {
			endpoint: mission?.route,
			mission: mission
		});
	}

	return (
		<View style={styles.view}>
			<Header />
			{loading ? <ActivityIndicator size="large" color={Colors.Secondary} /> : (
				<>
					<ScrollView refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}>
						<View style={styles.card}>
							<Text style={styles.text}>Mission #{mission?.id}</Text>
							<Text style={styles.text}>{format.hourly()}</Text>
						</View>
						{
							refreshing ? <ActivityIndicator size="large" color={Colors.Secondary} style={{marginTop: 40}} /> : (
								<>
									<View style={styles.container}>
										<Text style={styles.address}>{format.address()}</Text>
									</View>
									<View style={styles.container}>
										{
											mission?.isFinished ? (
												mission.unavailability ? (
													<View style={styles.unavailability}>
														<Text style={styles.important}>{ mission?.unavailability.reason.label }</Text>
													</View>
												) : (
													<View style={styles.finished}>
														<Text style={styles.important}>Mission terminée</Text>
														{/* <Text style={{textAlign: "center", marginTop: 4}}>Signée par l{ mission.signedByClient ? "'expert" : "e client" }</Text>						 */}
													</View>
												)
											) : (
												<Button title="Expertiser ce véhicule" onPress={toExpertise} />
											)
										}
									</View>
									{/* {
										mission?.isFinished ? (
											<SoftButton title="Voir la signature" onPress={() => { setShowSign(!showSign) }} css={{ marginTop: 0}} />
										) : (<></>)
									} */}
									<View style={styles.details}>
										<View style={styles.column}>
											<Text style={[styles.text]}>Type de rendez-vous :</Text>
											<Text style={[styles.text]}>Marque du véhicule   :</Text>
											<Text style={[styles.text]}>Modèle du véhicule   :</Text>
											<Text style={[styles.text]}>Couleur du véhicule  :</Text>
											<Text style={[styles.text]}>Kilomètres réalisés   :</Text>
										</View>
										<View style={styles.column}>
											<Text style={[styles.text]}>{isClient ? "Client" : "Garage"}</Text>
											<Text style={[styles.text]}>{mission?.vehicle.model.brand}</Text>
											<Text style={[styles.text]}>{mission?.vehicle.model.label}</Text>
											<Text style={[styles.text]}>{mission?.vehicle.color}</Text>
											<Text style={[styles.text]}>{mission?.kilometersCounter}</Text>
										</View>
									</View>
									{/* <View style={styles.map}>
										{
											loading ? <ActivityIndicator size="large" color={Colors.Secondary} /> : (
												<MapView
													style={styles.mapView}
													provider={PROVIDER_GOOGLE}
													region={{
														latitude: coordinates.latitude,
														longitude: coordinates.longitude,
														latitudeDelta: 0.0922,
														longitudeDelta: 0.0421,
													}} >
													<Marker
														coordinate={{ latitude: coordinates.latitude, longitude: coordinates.longitude }}
														title={ coordinates.title }
														description="" />
												</MapView>
											)
										}
									</View> */}
									{
										mission?.isFinished ? (
											<>
												{
													!mission.unavailability && mission.pree ? (
														<>
															<SoftButton title="Voir les prestations" onPress={toExpertise} css={{ marginTop: 40, marginBottom: 20 }} />
														</>
													) : (
														<></>
													)
												}
											</>
										) : (
											<>
												<SoftButton title="Véhicule indisponible" onPress={toUnavailable} css={{ marginTop: 40 }} />
											</>
										)
									}
									<SoftButton 
										title="Historique du véhicule" 
										onPress={toHistory} 
										css={{ marginTop: mission?.isFinished ? ( mission.unavailability ? 40 : -15 ) : 5 }}
									/>
								</>
							)
						}
					</ScrollView>
					{/* <Modal 
						isVisible={showSign} 
						onBackdropPress={() => { setShowSign(!showSign) }}
						onBackButtonPress={() => { setShowSign(!showSign) }}
						style={{ height: 300 }}
					>
						<View style={styles.modal}>
							<Text style={styles.title}>Signature du { mission?.signedByClient ? "client" : "garage" }</Text>
							<Image source={{ uri: `data:image/png;base64,${mission?.signature}` }} style={{ width: 300, height: 300 }} />
							<SoftButton title="Fermer" onPress={() => { setShowSign(!showSign) }} />
						</View>
					</Modal> */}
					<Arrow direction={Directions.Left} position={Positions.Left} onPress={() => { navigation.goBack() }} />
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: height,
	},
	details: {
		marginLeft: 20,
		marginRight: 20,
		marginTop: 40,
		flexDirection: "row",
	},
	title: {
		fontSize: 22,
		color: Colors.Details,
		fontWeight: "bold",
		marginBottom: 16,
	},
	column: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
	},
	address: {
		marginRight: 30,
		marginLeft: 30,
		fontSize: 17,
		color: Colors.Details,
		fontWeight: "bold",
		textAlign: "center",
	},
	text: {
		fontSize: 16,
		color: Colors.Details,
	},
	container: {
		marginTop: 10,
		alignItems: "center",
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
	modal: {
		backgroundColor: Colors.Primary,
		padding: 20,
		borderRadius: 10,
		// alignItems: "center",
	},
	map: {
		position: 'relative',
		marginTop: 50,
		alignSelf: 'center',
		height: 400,
		width: width - 40,
		marginBottom: 50,
	},
	mapView: {
		height: 400,
		width: width - 40,
		...StyleSheet.absoluteFillObject,
	},
	finished: {
		width: "100%",
		marginTop: 20,
		backgroundColor: Colors.Green,
		padding: 25,
	},
	unavailability: {
		width: "100%",
		backgroundColor: Colors.Error,
		padding: 25,
		marginTop: 20
	},
	important: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		textAlign: "center",
	},
});