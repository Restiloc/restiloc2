import { Dimensions, View, StyleSheet } from "react-native";
import Colors from "src/Colors";
import Header from "src/components/Header";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import type { MissionType } from "src/Types";
import { useEffect, useState } from "react";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
	route: {
		params: {
			mission: MissionType;
		}
	}
}

/**
 * This the page to realize an expertise of a vehicle of a specific mission.
 * 
 * @param navigation - The navigation of the app.
 * @param route - The route of the app with needed parameters.
 * @returns {JSX.Element} Rendered statistics page.
 */
export default function Expertise({ navigation, route }: Props): JSX.Element {

	const [loading, setLoading] = useState(true);

	useEffect(() => {

	}, [])

	return (
		<View style={styles.view}>
			<Header />
			<Arrow direction={Directions.Left} position={Positions.Left} onPress={() => navigation.goBack()} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: height,
		backgroundColor: Colors.Primary
	},
});