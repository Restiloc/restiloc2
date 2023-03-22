import { ActivityIndicator, StyleSheet, Text } from "react-native";
import Colors from "../Colors";
import Storage from "src/Storage";
import { useEffect, useState } from "react";
import { MissionType } from "src/Types";
import Mission from "./Mission";
import { todayMissions } from "src/services/api/Missions";

type Props = {
	navigation: any,
}

export default function TodayMissions({ navigation }: Props): JSX.Element {

	const [missions, setMissions] = useState<MissionType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [fetchStatus, setFetchStatus] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			let response = await todayMissions();
			if (!response) {
				setFetchStatus(false);
				return;
			}
			setMissions(response);
			setLoading(false);
		})()
	}, [])

	return (
		<>
			<Text style={styles.title}>Missions du jour</Text>
			{
				!fetchStatus
					? <Text style={styles.p}>Une erreur est survenue lors du chargement.</Text>
					: loading
						? <ActivityIndicator size="large" color={Colors.Secondary} />
						: missions.length === 0
							? <Text style={styles.p}>Aucune mission pour aujourd'hui.</Text>
							: missions!.map((mission: MissionType) => {
								return (
									<Mission mission={mission} key={mission.id} navigation={navigation} />
								)
							})
			}
		</>
	)

}

const styles = StyleSheet.create({
	title: {
		fontSize: 30,
		color: Colors.Details,
		marginTop: 20,
		marginBottom: 20,
	},
	p: {
		fontSize: 16,
		color: Colors.Details,
	}
})