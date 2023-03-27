import { Dimensions, View, ScrollView, StyleSheet, ActivityIndicator, Text } from "react-native";
import Navbar from "src/components/Navbar";
import Colors from "src/Colors";
import Header from "src/components/Header";
import { useEffect, useState } from "react";
import type { Stats } from "src/Types";
import { getStatistics } from "src/services/api/Stats";
import StatsCard from "src/components/StatsCard";

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
			<Header />
			<ScrollView style={styles.container}>
				<Text style={styles.title}>Statistiques</Text>
				{ loading ? <ActivityIndicator size="large" color={Colors.Secondary} /> : 
					<>
						<View style={styles.cards}>
							{
								statistics.map((stats: Stats, index: number) => {
									return (
										<StatsCard key={index} stats={stats} />
										)
									})
								}
						</View> 
					</>
				}
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
	container: {
		marginLeft: 20,
		marginRight: 20,
	},
	cards: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	title: {
		color: Colors.Details,
		fontSize: 28,
		fontWeight: "bold",
		marginTop: 10,
	}
});
