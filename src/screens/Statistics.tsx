import { Dimensions, View, ScrollView, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import Navbar from "src/components/Navbar";
import Colors from "src/Colors";
import Header from "src/components/Header";

const { width, height } = Dimensions.get("window");

type StatisticsProps = {
	navigation: any;
}

export default function Statistics(props: StatisticsProps): JSX.Element {

	const [token, setToken] = useState("");

	useEffect(() => {
		
	}, [token])
	
	return (
		<View style={styles.view}>
			<Header />
			<ScrollView>
				<Text style={styles.void}>Coming soon...</Text>
			</ScrollView>
			<Navbar activeItem="statistics" navigation={props.navigation} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: height,
		backgroundColor: Colors.Primary
	},
	void: {
		height: height - 350,
		textAlign: "center",
		textAlignVertical: "center",
		color: Colors.Secondary,
		fontSize: 30,
		fontWeight: "bold",
	}
});