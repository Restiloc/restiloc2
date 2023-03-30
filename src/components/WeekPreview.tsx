import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "src/Colors";

type Props = {
	navigation: any;
	week: any;
	stats: any;
	currentWeek?: boolean;
}

export default function WeekPreview({ navigation, week, stats, currentWeek }: Props): JSX.Element {

	const styles = StyleSheet.create({
		card: {
			backgroundColor: currentWeek ? Colors.CurrentWeek : Colors.SettingBackground,
			borderRadius: 10,
			width: 60,
			height: 60,
			justifyContent: "center",
			alignItems: "center"
		},
		week: {
			color: Colors.Details,
		}
	})

	const toWeekStats = () => {
		navigation.navigate("week", {
			stats: stats,
			week: week
		});
	}

	return (
		<TouchableOpacity style={styles.card} onPress={toWeekStats}>
			<Text style={styles.week}>
				{week}
			</Text>
		</TouchableOpacity>
	)
}