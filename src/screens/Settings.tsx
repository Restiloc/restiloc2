import { Dimensions, StyleSheet, View, ScrollView, Text } from "react-native";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./../../App";

import Navbar from "src/components/Navbar";
import Storage from "src/Storage";
import Colors from "src/Colors";
import Header from "src/components/Header";
import Button from "src/components/Button";

const { width, height } = Dimensions.get("window");

type SettingsProps = {
	navigation: any;
}

type Me = {
	message?: string,
	created_at: string,
	email: string,
	email_verified_at: string,
	firstName: string,
	id: number,
	lastName: string,
	phoneNumber: string,
	updated_at: string,
	username: string,
}

export default function Settings(props: SettingsProps): JSX.Element {

	const [expert, setExpert] = useState<Me>({} as Me);

	const { signOut } = useContext(AuthContext);

	useEffect(() => {
		// Get all informations about the current expert
		// Using the /me endpoint
		(async () => {
			let token = await Storage.get("token");	
			fetch("https://restiloc.space/api/me", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `Bearer ${token}`
				}
			}).then((response) => response.json())
			.then((data: Me) => {
				if (data.message === "Unauthenticated.") {
					console.error("Invalid token...");
					signOut();
					return;
				}
				setExpert(data);
			})
		})()
	}, [])
	
	return (
		<View style={styles.view}>
			<Header />
			<ScrollView>
				<Text style={styles.title}>{expert.lastName} {expert.firstName}</Text>
				<Text style={styles.title}>{expert.email}</Text>
				<Text style={styles.title}>{expert.phoneNumber}</Text>
				<Text style={styles.title}>{expert.lastName} {expert.firstName}</Text>
				<Button title="Déconnexion" onPress={signOut} />
			</ScrollView>
			<Navbar activeItem="settings" navigation={props.navigation} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: height,
		backgroundColor: Colors.Primary,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		color: "black"
	}
});