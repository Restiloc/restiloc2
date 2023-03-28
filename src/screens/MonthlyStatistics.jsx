import { Dimensions, View, ScrollView, StyleSheet, ActivityIndicator, Text } from "react-native";
import Navbar from "src/components/Navbar";
import Colors from "src/Colors";
import Header from "src/components/Header";
import { useEffect, useState } from "react";
import { getStatistics } from "src/services/api/Stats";
import StatsCard from "src/components/StatsCard";
import SoftButton from "src/components/SoftButton";

const { height } = Dimensions.get("window");

/**
 * This is the statistics page of the app.
 * 
 * @param navigation - The navigation of the app.
 * @returns {JSX.Element} Rendered statistics page.
 */
export default function MonthlyStatistics({ navigation }): JSX.Element {

	const [loading, setLoading] = useState(true);
	const [statistics, setStatistics] = useState<Stats[]>([]);

	useEffect(() => {
		(async () => {
			let stats = await getStatistics();
			setStatistics(stats ? stats : []);
			setLoading(false);
		})()
	}, [])

	return (
		<View style={styles.view}>
		</View>
	)
}