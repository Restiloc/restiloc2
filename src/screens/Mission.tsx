import { Dimensions, ScrollView, StyleSheet, View, Text, ActivityIndicator, RefreshControl } from "react-native";
import Storage from "src/Storage";
import { useEffect, useState, useContext, useCallback } from "react";
import Header from "src/components/Header";
import { AuthContext } from "../../App";
import type { Client, Garage, MissionType } from "../Types";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import Colors from "src/Colors";
import Button from "src/components/Button";
import SoftButton from "src/components/SoftButton";
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get("window");

type Props = {
	navigation: any;
	route: {
		params: {
			id: string;
			route: string;
			mission: MissionType;
			coordinates: {
				latitude: number;
				longitude: number;
				title: string;
			};
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
	}, [])

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
			endpoint: mission?.vehicle.route,
			vehicle: mission?.vehicle
		});
	}

	// function toHistory() {
	// 	navigation.navigate("history", {
	// 		endpoint: mission?.vehicle.route,
	// 		vehicle: mission?.vehicle
	// 	});
	// }

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
						<View style={styles.container}>
							<Text style={styles.address}>{format.address()}</Text>
						</View>
						<View style={styles.container}>
							<Button title="Expertiser ce véhicule" onPress={toExpertise} />
						</View>
						<View style={styles.details}>
							<View style={styles.column}>
								<Text style={[styles.text]}>Type de rendez-vous :</Text>
								<Text style={[styles.text]}>Marque du véhicule  :</Text>
								<Text style={[styles.text]}>Modèle du véhicule  :</Text>
								<Text style={[styles.text]}>Couleur du véhicule :</Text>
								<Text style={[styles.text]}>Kilomètres réalisés :</Text>
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
						<SoftButton title="Véhicule indisponible" onPress={toUnavailable} css={{ marginTop: 40 }} />
						{/* <SoftButton title="Historique du véhicule" onPress={toHistory} /> */}
					</ScrollView>
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
	column: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
	},
	address: {
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
	}
});