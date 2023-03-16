import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../Colors";
import Storage from "src/Storage";
import { useEffect, useState, useContext } from "react";
import Navbar from "src/components/Navbar";
import Header from "src/components/Header";
import type { Mission } from "src/screens/Planning";
import { AuthContext } from "../../App";

const { width, height } = Dimensions.get("window");

type MissionProps = {
	navigation: any;
	route: {
		params: {
			id: string;
			route: string;
			mission: Mission;
		}
	};
}

/**
 * This is the login page of the app.
 * 
 * @returns {JSX.Element} The login page.
 */
export default function Mission(props: MissionProps): JSX.Element {

	const [mission, setMission] = useState();
	const { id, route } = props.route.params;
	const { signOut } = useContext(AuthContext);

	useEffect(() => {
		(async () => {
			let token = await Storage.get("token");
			fetch(route, {
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
				setMission(data);
			})
		})()
	}, [])
	
	console.log(mission);

	return (
		<View style={styles.view}>
			<Header />
			<ScrollView>
			</ScrollView>
			<Navbar activeItem="" navigation={props.navigation} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: height,
	},
});