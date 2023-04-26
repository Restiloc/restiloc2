import { Dimensions, View, ScrollView, StyleSheet, Text } from "react-native";
import Colors from "src/Colors";
import Header from "src/components/Header";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import WeekPreview from "src/components/WeekPreview";

type Props = {
	navigation: any;
	route: {
		params: {
			year: number;
			weeks: []
		}
	}
}

/**
 * This the history of missions realized on a vehicle.
 * 
 * @param navigation - The navigation of the app.
 * @param route - The route of the app with needed parameters.
 * @returns {JSX.Element} Rendered statistics page.
 */
export default function Weeks({ navigation, route }: Props): JSX.Element {

	const { year, weeks } = route.params;

	function isCurrentWeek(week: number) {
		const today = new Date();
		const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
		const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
		const currentWeek = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
		return currentWeek === week;
	}

	const isCurrentYear = (year: number) => new Date().getFullYear() === year;

	const currentDate = (year: number, week: number): boolean => isCurrentWeek(week) && isCurrentYear(year);

	return (
		<View style={styles.view}>
			<Header />
			<ScrollView style={styles.container}>
				<Text style={styles.title}>Semaines disponibles</Text>
				<Text style={styles.year}>Année <Text style={{fontWeight: "bold"}}>{year}</Text> sélectionnée</Text>
				<View style={styles.preview}>
					{
						Object.keys(weeks).map((week: any) => {
							return (
								<WeekPreview navigation={navigation} week={week} stats={weeks[week]} key={week} currentWeek={currentDate(year, parseInt(week))} />
							)
						})
					}
				</View>
			</ScrollView>
			<Arrow direction={Directions.Left} position={Positions.Left} onPress={() => navigation.goBack()} />
		</View>
	)
}

const styles = StyleSheet.create({
	preview: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		marginTop: 20,
	},
	title: {
		color: Colors.Details,
		fontSize: 28,
		fontWeight: "bold",
		marginTop: 10,
	},
	year: {
		marginTop: 10,
		marginBottom: 10,
		color: Colors.Details,
		fontSize: 12,
	},
	view: {
		height: Dimensions.get("window").height,
	},
	container: {
		marginRight: 20,
		marginLeft: 20,
	}
})