import { Dimensions, View, ScrollView, StyleSheet, Text, ActivityIndicator, RefreshControl } from "react-native";
import Colors from "src/Colors";
import Header from "src/components/Header";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import { useEffect, useState, useCallback } from "react";
import { WeeklyStats } from "src/Types";
import { getWeeklyStatistics } from "src/services/api/Stats";
import SoftButton from "src/components/SoftButton";

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

	const [stats, setStats] = useState<WeeklyStats[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	useEffect(() => {
		(async () => {
			let response: WeeklyStats[] = await getWeeklyStatistics();
			setStats(response);
			setLoading(false);
		})()
	}, [])

	return (
		<View style={styles.view}>
			<Header />
			<ScrollView style={styles.container} refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
				<Text style={styles.title}>Années disponibles</Text>
				<View style={styles.years}>
					{
						refreshing ? <></> : <>
							{
								loading ? <ActivityIndicator size="large" color={Colors.Secondary} /> : <>
									{stats.map((item, index) => {
										return (
											<>
												<SoftButton key={index} title={item.year.toString()} onPress={() => {
													navigation.navigate("weeks", {
														year: item.year,
														weeks: item.weeks
													})
												}} />
											</>
										)
									})}
								</>
							}
						</>
					}
				</View>
			</ScrollView>
			<Arrow direction={Directions.Left} position={Positions.Left} onPress={() => navigation.goBack()} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: Dimensions.get("window").height,
	},
	container: {
		marginLeft: 20,
		marginRight: 20,
	},
	title: {
		color: Colors.Details,
		fontSize: 28,
		fontWeight: "bold",
		marginTop: 10,
	},
	years: {
		marginTop: 20,
	}
})
