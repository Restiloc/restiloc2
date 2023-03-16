import { Dimensions, View, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Navbar from "src/components/Navbar";

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
			<ScrollView>
			</ScrollView>
			<Navbar activeItem="statistics" navigation={props.navigation} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: height,
	}
});