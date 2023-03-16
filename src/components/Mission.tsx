import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Colors from 'src/Colors';

const { width, height } = Dimensions.get("window");

export type MissionProps = {
	navigation: any,
	mission: {
		id: number;
		dateMission: string;
		startedAt?: string;
		kilometersCounter: number;
		nameExpertFile: string;
		isFinished: boolean;
		route: string;
		vehicle: [];
		expert: [];
		garage: [];
		unavailability: [];
		pree: [];
	}
}

export default function Mission(props: MissionProps): JSX.Element {

	const toMission = () => {
		console.log("Redirecting to mission #" + props.mission.id + " with the following payload: " + JSON.stringify(props.mission))
		props.navigation.navigate("mission", {
			id: props.mission.id,
			route: props.mission.route, 
			mission: props.mission 
		});
	}

	const format = {
		date: (props.mission.dateMission ?? "").split("-").reverse().join("/"),
		time: (props.mission.startedAt ?? "").split(":").slice(0, 2).join("h")
	}

	return (
		<TouchableOpacity onPress={toMission} style={styles.card}>
			<Text style={styles.color}>Mission #{props.mission.id}</Text>
			<Text style={styles.color}>le {format.date} à {format.time}</Text>
		</TouchableOpacity>
	)
}

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