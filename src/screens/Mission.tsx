import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import Storage from "src/Storage";
import { useEffect, useState, useContext } from "react";
import Navbar from "src/components/Navbar";
import Header from "src/components/Header";
import { AuthContext } from "../../App";
import type { MissionType } from "../Types";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
	route: {
		params: {
			id: string;
			route: string;
			mission: MissionType;
		}
	};
}

/**
 * This is page to view a mission.
 * 
 * @param navigation - The navigation of the app.
 * @param route - The route of the app.
 * @returns {JSX.Element} Rendered mission page.
 */
export default function Mission({ navigation, route }: Props): JSX.Element {

	const styles = StyleSheet.create({
		view: {
			height: height,
		},
	});

	const [mission, setMission] = useState();
	const endpoint = route.params.route;
	
	// @ts-ignore
	const { signOut } = useContext(AuthContext); 

	useEffect(() => {
		(async () => {
			let token = await Storage.get("token");
			fetch(endpoint, {
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

	return (
		<View style={styles.view}>
			<Header />
			<ScrollView>
			</ScrollView>
			<Navbar activeItem="" navigation={navigation} />
		</View>
	)
}