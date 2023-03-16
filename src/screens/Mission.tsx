import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../Colors";
import Storage from "src/Storage";
import { useEffect, useState } from "react";
import Navbar from "src/components/Navbar";
import Header from "src/components/Header";

const { width, height } = Dimensions.get("window");

type MissionProps = {
	navigation: any;
}

type Mission = {

}

/**
 * This is the login page of the app.
 * 
 * @returns {JSX.Element} The login page.
 */
export default function Mission(props: MissionProps): JSX.Element {

	const [token, setToken] = useState("");
	const [mission, setMission] = useState([]);

	useEffect(() => {
	}, [])
	
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