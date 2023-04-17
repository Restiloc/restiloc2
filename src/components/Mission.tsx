import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Colors from 'src/Colors';
import { MissionType } from 'src/Types';
import { format } from 'src/Constants';

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

	function getCoordinates() {
		if (mission?.garage?.latitude && mission?.garage?.longitude) {
			return {
				latitude: parseFloat(mission.garage.latitude),
				longitude: parseFloat(mission.garage.longitude),
				title: mission.garage.name,
			}
		} else if (mission?.client?.latitude && mission?.client?.longitude) {
			return {
				latitude: parseFloat(mission.client.latitude),
				longitude: parseFloat(mission.client.longitude),
				title: `${mission.client.firstName} ${mission.client.lastName}`,
			}
		}
	}

	/**
	 * Redirects to the corresponding mission page.
	 * Sends the mission object as a payload.
	 */
	const toMission = () => {
		console.log("Redirecting to mission #" + mission.id + " with the following payload: " + JSON.stringify(mission))
		navigation.navigate("mission", {
			id: mission.id,
			route: mission.route, 
			mission: mission,
			coordinates: getCoordinates()
		});
	}

	return (
		<TouchableOpacity onPress={toMission} style={styles.card}>
			<Text style={styles.color}>Mission #{mission.id}</Text>
			<Text style={styles.color}>{format.hourly(mission)}</Text>
		</TouchableOpacity>
	)
}