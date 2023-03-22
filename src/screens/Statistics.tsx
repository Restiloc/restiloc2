import { Dimensions, View, ScrollView, StyleSheet, Text } from "react-native";
import Navbar from "src/components/Navbar";
import Colors from "src/Colors";
import Header from "src/components/Header";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
}

/**
 * This is the statistics page of the app.
 * 
 * @param navigation - The navigation of the app.
 * @returns {JSX.Element} Rendered statistics page.
 */
export default function Statistics({ navigation }: Props): JSX.Element {
	return (
		<View style={styles.view}>
			<Header />
			<ScrollView>
				<Text style={styles.void}>Coming soon...</Text>
			</ScrollView>
			<Navbar activeItem="statistics" navigation={navigation} />
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
