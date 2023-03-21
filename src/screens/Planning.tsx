import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../Colors";
import Storage from "src/Storage";
import { useEffect, useState, useContext } from "react";
import Mission from "src/components/Mission";
import Navbar from "src/components/Navbar";
import Header from "src/components/Header";
import { AuthContext } from "../../App";
import type { MissionType } from "../Types";
import Popup, { PopupType } from "src/components/Popup";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
}	

/**
* This is the login page of the app.
*
* @param navigation - The navigation of the app.
* @returns {JSX.Element} The login page.
*/
export default function Planning({ navigation }: Props): JSX.Element {

	const styles = StyleSheet.create({
		view: {
			height: height,
		},
		title: {
			fontSize: 30,
			color: Colors.Details,
			marginTop: 20,
			marginBottom: 20,
		},
		mission: {
			marginLeft: 20,
			marginRight: 20,
			marginBottom: 20,
		},
		p: {
			fontSize: 16,
			color: Colors.Details,
		}
	});

	const [missionsLoading, setMissionsLoading] = useState<boolean>(true);
	const [todayMissionsLoading, setTodayMissionsLoading] = useState<boolean>(true);
	const [missionsFetchFailed, setMissionsFetchFailed] = useState<boolean>(false);
	const [todayMissionsFetchFailed, setTodayMissionsFetchFailed] = useState<boolean>(false);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [token, setToken] = useState("");
	const [missions, setMissions] = useState([]);
	const [todayMissions, setTodayMissions] = useState([]);

	// @ts-ignore
	const { signOut } = useContext(AuthContext);

	const finishedMissions = (missions: any[]) => {
		return missions.filter((mission: MissionType) => mission.isFinished);
	}

	useEffect(() => {
		(async () => {
			let fromLoginScreen = await Storage.get("fromLoginScreen");
			if (fromLoginScreen) {
				console.log("Expert coming from login screen, show login success message.");
				setShowPopup(true);
				await Storage.remove("fromLoginScreen");
				setTimeout(() => { setShowPopup(false); }, 5000);
			}
			let token = await Storage.get("token");
			setToken(token?.toString() ?? "");
			console.log("Token in storage: " + token);
			fetch("https://restiloc.space/api/me/missions", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `Bearer ${token}`
				}
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						setMissionsFetchFailed(true);
					}
				})
				.then((data) => {
					if (data === undefined) {
						setMissionsFetchFailed(true);
						return;
					}
					if (data.message === "Unauthenticated.") {
						console.log("Token is invalid. Redirecting to login page.")
						signOut();
						return;
					}
					setMissions(data);
					setMissionsLoading(false);
				})
			fetch("https://restiloc.space/api/me/missions?_date=today", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `Bearer ${token}`
				}
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						setTodayMissionsFetchFailed(true);
					}
				})
				.then((data) => {
					if (data === undefined) {
						setTodayMissionsFetchFailed(true);
						return;
					}
					if (data.message === "Unauthenticated.") {
						console.log("Token is invalid. Redirecting to login page.")
						signOut();
						return;
					}
					setTodayMissions(data);
					setTodayMissionsLoading(false);
				})
		})()
	}, [token])

	return (
		<View style={styles.view}>
			<Header /> 
			{ showPopup ? <Popup type={PopupType.Success} title="Bienvenue sur Restiloc !" /> : <></> }
			{
				<ScrollView style={styles.mission}>
					<Text style={styles.title}>Missions du jour</Text>
					{
						missionsFetchFailed
							? <Text style={styles.p}>Une erreur est survenue lors du chargement des missions.</Text>
							: missionsLoading
								? <ActivityIndicator size="large" color={Colors.Secondary} />
								: todayMissions.length === 0
									? <Text style={styles.p}>Aucune mission pour aujourd'hui.</Text>
									: todayMissions!.map((mission: MissionType) => {
										return (
											<Mission mission={mission} key={mission.id} navigation={navigation} />
										)
									})
					}
					<Text style={styles.title}>Missions à venir</Text>
					{
						todayMissionsFetchFailed
							? <Text style={styles.p}>Une erreur est survenue lors du chargement des missions.</Text>
							: todayMissionsLoading
								? <ActivityIndicator size="large" color={Colors.Secondary} />
								: missions.length === 0
									? <Text style={styles.p}>Aucune mission à venir.</Text>
									: missions!.map((mission: MissionType) => {
										return (
											<Mission mission={mission} key={mission.id} navigation={navigation} />
										)
									})
					}
					<Text style={styles.title}>Missions terminées</Text>
					{
						missionsFetchFailed
							? <Text style={styles.p}>Une erreur est survenue lors du chargement des missions.</Text>
							: missionsLoading
								? <ActivityIndicator size="large" color={Colors.Secondary} />
								: finishedMissions(missions).length === 0
									? <Text style={styles.p}>Aucune mission terminée.</Text>
									: finishedMissions(missions)!.map((mission: MissionType) => {
										return (
											<Mission mission={mission} key={mission.id} navigation={navigation} />
										)
									})
					}
				</ScrollView>
			}
			<Navbar activeItem="planning" navigation={navigation} />
		</View>
	)
}