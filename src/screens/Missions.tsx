import { ActivityIndicator, StyleSheet, Text, View, ScrollView, RefreshControl } from "react-native";
import Colors from "../Colors";
import { useEffect, useState, useCallback } from "react";
import { MissionType } from "src/Types";
import Mission from "../components/Mission";
import { getMissions } from "src/services/api/Missions";
import Header from "src/components/Header";
import Arrow, { Directions, Positions } from "src/components/Arrow";

type Props = {
	navigation: any
}

export default function Missions({ navigation }: Props): JSX.Element {

	const [missions, setMissions] = useState<MissionType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [fetchStatus, setFetchStatus] = useState<boolean>(true);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	useEffect(() => {
		(async () => {
			let response = await getMissions();
			if (!response) {
				setFetchStatus(false);
				return;
			}
			setMissions(response);
			setLoading(false);
		})()
	}, [refreshing])

	return (
		<View style={styles.view}>
			<Header />
			<Text style={styles.title}>Missions à venir</Text>
			<ScrollView style={styles.missions} refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
				{
					!fetchStatus
						? <Text style={styles.p}>Une erreur est survenue lors du chargement.</Text>
						: loading
							? <ActivityIndicator size="large" color={Colors.Secondary} />
							: refreshing 
								? <ActivityIndicator size="large" color={Colors.Secondary} />
								: missions.length === 0 
									? <Text style={styles.p}>Aucune mission de prévue.</Text>
									: missions!.map((mission: MissionType) => {
										return (
											<Mission mission={mission} key={mission.id} navigation={navigation} />
										)
									})
				}
			</ScrollView>
			<Arrow direction={Directions.Left} position={Positions.Left} onPress={() => navigation.goBack()} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: "100%",
	},
	missions: {
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 20,
	},
	title: {
		marginLeft: 20,
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