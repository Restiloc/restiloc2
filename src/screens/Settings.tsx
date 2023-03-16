import { Dimensions, StyleSheet, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Navbar from "src/components/Navbar";

const { width, height } = Dimensions.get("window");

type SettingsProps = {
	navigation: any;
}

export default function Settings(props: SettingsProps): JSX.Element {

	const [token, setToken] = useState("");

	useEffect(() => {
	}, [token])
	
	return (
		<View style={styles.view}>
			<ScrollView>
			</ScrollView>
			<Navbar activeItem="settings" navigation={props.navigation} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: height,
	}
});