import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../Colors";
import Storage from "src/Storage";
import { useEffect, useState, useContext } from "react";
import Mission from "src/components/Mission";
import Navbar from "src/components/Navbar";
import Header from "src/components/Header";
import { AuthContext } from "../../App";

const { width, height } = Dimensions.get("window");

type PlanningProps = {
	navigation: any;
}

type Mission = {
	id: number;
	dateMission: string;
	startedAt?: string;
	kilometersCounter: number;
	nameExpertFile: string;
	isFinished: boolean;
	route: string;
	vehicle: [];
	expert: [];
	garage: [];
	unavailability: [];
	pree: [];
}

/**
 * This is the login page of the app.
 * 
 * @returns {JSX.Element} The login page.
 */
export default function Planning(props: PlanningProps): JSX.Element {

	const [token, setToken] = useState("");
	const [missions, setMissions] = useState([]);
	const [todayMissions, setTodayMissions] = useState([]);

	const { signOut } = useContext(AuthContext);

	useEffect(() => {
		(async () => {
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
			}).then((response) => response.json())
			.then((data) => {
				if (data.message === "Unauthenticated.") {
					console.log("Token is invalid. Redirecting to login page.")
					signOut();
					return;
				}
				setMissions(data);
			})
			fetch("https://restiloc.space/api/me/missions?_date=today", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `Bearer ${token}`
				}
			}).then((response) => response.json())
			.then((data) => {
				if (data.message === "Unauthenticated.") {
					console.log("Token is invalid. Redirecting to login page.")
					signOut();
					return;
				}
				setTodayMissions(data);
			})
		})()
	}, [token])
	
	return (
		<View style={styles.view}>
			<Header />
			<ScrollView style={styles.mission}>
				<Text style={styles.title}>Missions du jour</Text>
				{
					!todayMissions || todayMissions.length === 0 
					? <Text style={styles.p}>Aucune mission pour aujourd'hui !</Text> 
					: todayMissions.map((mission: Mission) => {
						return (
							<Mission mission={mission} key={mission.id} navigation={props.navigation}/>
						)
					})
				}
				<Text style={styles.title}>Missions à venir</Text>
				{
					!missions || missions.length === 0
					? <Text style={styles.p}>Aucune mission à venir !</Text>
					: missions.map((mission: Mission) => {
						return (
							<Mission mission={mission} key={mission.id} navigation={props.navigation}/>
						)
					})
				}
			</ScrollView>
			<Navbar activeItem="planning" navigation={props.navigation} />
		</View>
	)
}

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