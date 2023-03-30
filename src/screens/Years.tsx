import { Dimensions, View, ScrollView, StyleSheet, Text, ActivityIndicator } from "react-native";
import Colors from "src/Colors";
import Header from "src/components/Header";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import { useEffect, useState } from "react";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
}

/**
 * This the history of missions realized on a vehicle.
 * 
 * @param navigation - The navigation of the app.
 * @param route - The route of the app with needed parameters.
 * @returns {JSX.Element} Rendered statistics page.
 */
export default function Years({ navigation }: Props): JSX.Element {

	const [loading, setLoading] = useState(true);

	useEffect(() => {

	}, [])

	return (
		<>
			<ScrollView>
		
			</ScrollView>
			<Arrow direction={Directions.Left} position={Positions.Left} onPress={() => navigation.goBack()} />
		</>
	)
}