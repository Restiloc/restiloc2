import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../Colors";
import Storage from "src/Storage";
import { useEffect, useState } from "react";
import Mission from "src/components/Mission";
import Navbar from "src/components/Navbar";
import Header from "src/components/Header";

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
					return;
				}
				setMissions(data);
			})
		})()
	}, [token])
	
	return (
		<View style={styles.view}>
			<Header />
			<ScrollView style={styles.mission}>
				{
					missions.map((mission: Mission) => {
						return (
							<Mission mission={mission} key={mission.id}/>
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
	mission: {
		backgroundColor: Colors.Primary,
	}
});