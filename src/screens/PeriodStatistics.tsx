import { useEffect, useState } from "react";
import { Dimensions, View, ScrollView, StyleSheet, Text, ActivityIndicator } from "react-native";
import Colors from "src/Colors";
import Header from "src/components/Header";
import StatsCard from "src/components/StatsCard";
import type { Stats } from "src/Types";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import { getStatisticsByPeriod } from "src/services/api/Stats";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
	route: {
		params: {
			startDate: string;
			endDate: string;
		}
	}
}

/**
 * This is the statistics page of a selected period.
 * 
 * @param navigation - The navigation of the app.
 * @returns {JSX.Element} Rendered statistics page.
 */
export default function PeriodStatistics({ navigation, route }: Props): JSX.Element {

	const [loading, setLoading] = useState(true);
	const [statistics, setStatistics] = useState<Stats[]>([]);
	const [startDate] = useState<Date>(new Date(route.params.startDate));
	const [endDate] = useState<Date>(new Date(route.params.endDate));

	useEffect(() => {
		(async () => {
			let stats: Stats[] = await getStatisticsByPeriod({
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString()
			});
			setStatistics(stats ? stats : []);
			setLoading(false);
		})()
	}, [])

	return (
		<View style={styles.view}>
			<Header />
			<ScrollView style={styles.container}>
				<Text style={styles.title}>Statistiques</Text>
				<Text style={styles.period}>Période du <Text style={styles.date}>{startDate.toLocaleDateString()} </Text> au <Text style={styles.date}>{endDate.toLocaleDateString()}</Text></Text>
				{loading ? <ActivityIndicator size="large" color={Colors.Secondary} /> :
					<>
						<View style={styles.cards}>
							{
								statistics.length > 0 ?
									statistics.map((stats: Stats, index: number) => {
										return (
											<StatsCard key={index} stats={stats} />
										)
									})
									: <Text style={{ color: Colors.Details }}>Aucune statistique disponible.</Text>
							}
						</View>
					</>
				}
			</ScrollView>
			<Arrow direction={Directions.Left} position={Positions.Left} onPress={() => navigation.goBack()} />
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
	},
	period: {
		marginTop: 10,
		marginBottom: 10,
		color: Colors.Details,
		fontSize: 12,
	},
	date: {
		color: Colors.Details,
		fontSize: 14,
		fontWeight: "bold",
	}
});
