import { View, Text, StyleSheet } from 'react-native'
import Colors from 'src/Colors';

export type MissionProps = {
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
	return (
		<View key={props.mission.id} style={styles.card}>
			<Text style={styles.color}>{props.mission.id}</Text>
			<Text style={styles.color}>{props.mission.dateMission}</Text>
			<Text style={styles.color}>{props.mission.startedAt}</Text>
			<Text style={styles.color}>{props.mission.kilometersCounter}</Text>
			<Text style={styles.color}>{props.mission.nameExpertFile}</Text>
			<Text style={styles.color}>{props.mission.isFinished}</Text>
			<Text style={styles.color}>{props.mission.route}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	color: {
		color: "black"
	},
	card: {
		color: "black",
		backgroundColor: Colors.Error,
		borderRadius: 10,
		margin: 10,
		padding: 10
	}
})