import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Colors from 'src/Colors';
import { MissionType } from 'src/Types';

const { width } = Dimensions.get("window");

export type Props = {
	navigation: any;
	mission: MissionType;
}

/**
 * This is the mission card component.
 * 
 * @param navigation - The navigation object.
 * @param mission - The mission object.
 * @returns JSX.Element - Rendered mission card.
 */
export default function Mission({ navigation, mission }: Props): JSX.Element {

	const styles = StyleSheet.create({
		color: {
			color: "black"
		},
		card: {
			color: "black",
			backgroundColor: Colors.Mission,
			height: 100,
			width: width - 40,
			borderColor: Colors.Details,
			borderWidth: 1,
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-evenly",
		}
	})

	/**
	 * Redirects to the corresponding mission page.
	 * Sends the mission object as a payload.
	 */
	const toMission = () => {
		console.log("Redirecting to mission #" + mission.id + " with the following payload: " + JSON.stringify(mission))
		navigation.navigate("mission", {
			id: mission.id,
			route: mission.route, 
			mission: mission 
		});
	}

	/**
	 * Formats the date and time of the mission.
	 * From "2021-05-01 12:00:00" to "01/05/2021 12h00" for example.
	 */
	const format = {
		hourly: () => {
			let date = (mission?.dateMission ?? "").split("-").reverse().join("/"),
			time = (mission?.startedAt ?? "").split(":").slice(0, 2).join("h");
			if (!date || !time) return "Date inconnue";
			return `le ${date} à ${time}`
		}
	}

	return (
		<TouchableOpacity onPress={toMission} style={styles.card}>
			<Text style={styles.color}>Mission #{mission.id}</Text>
			<Text style={styles.color}>{format.hourly()}</Text>
		</TouchableOpacity>
	)
}