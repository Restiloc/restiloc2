import { Dimensions, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Colors from "src/Colors";
import Header from "src/components/Header";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import type { MissionType, ReasonType } from "src/Types";
import { useEffect, useState } from "react";
import Button from "src/components/Button";
import DropdownSelect from "react-native-input-select";
import { getReasons } from "src/services/api/Reasons";
import { sendUnavailability } from "src/services/api/Missions";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
	route: {
		params: {
			mission: MissionType;
		}
	}
}

/**
 * This the page to report an unavailability of a vehicle.
 * 
 * @param navigation - The navigation of the app.
 * @param route - The route of the app with needed parameters.
 * @returns {JSX.Element} Rendered statistics page.
 */
export default function Unavailable({ navigation, route }: Props): JSX.Element {

	const [loading, setLoading] = useState(true);
	const [mission, setMission] = useState<MissionType>();
	const [unavailabilityReason, setUnavailabilityReason] = useState<string>("");
	const [reasons, setReasons] = useState<ReasonType[]>([]);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const reasons = await getReasons();
			setReasons(reasons ? reasons : []);
			setLoading(false);
		})()
		setMission(route.params.mission);
	}, [])

	const submitUnavailability = async () => {
		if (unavailabilityReason === "") {
			setError(true);
			return;
		}
		// @ts-ignore
		console.log(`For missions #${mission.id}, the reason is: ${unavailabilityReason}, corresponding to the reason: ${reasons.find((reason: ReasonType) => reason.id === unavailabilityReason).label}`);
		const response = await sendUnavailability({
			// @ts-ignore
			mission_id: mission.id,
			// @ts-ignore
			reason_id: unavailabilityReason
		});
		if (!response) {
			setError(true)
		} else {
			setError(false);
			navigation.navigate("planning");
		}
	}

	return (
		<View style={styles.view}>
			<Header />
			<View style={styles.container}>
				{
					loading 
					? <ActivityIndicator size="large" color={Colors.Details} />
					: <>
						{ error ? <Text style={styles.error}>Veuillez sélectionner un motif</Text> : null }
						<Text style={styles.label}>Motif d'indisponibilité</Text>
						<DropdownSelect
							isMultiple={false}
							isSearchable={false}
							dropdownContainerStyle={{ width: 300 }}
							checkboxLabelStyle={{ color: "black" }}
							placeholder="Sélectionnez un motif"
							options={reasons}
							optionLabel={'label'}
							optionValue={'id'}
							onValueChange={(text: string) => { setUnavailabilityReason(text) }}
							primaryColor={'green'}
						/>
						<Button title="Soumettre" onPress={submitUnavailability} />
					</>
				}
			</View>
			<Arrow direction={Directions.Left} position={Positions.Left} onPress={() => navigation.goBack()} />
		</View>
	)
}

const styles = StyleSheet.create({
	error: {
		color: "black",
		backgroundColor: Colors.Error,
		padding: 10,
		marginTop: -20,
		width: 250,
		textAlign: "center",
		marginBottom: 20,
		borderRadius: 10,
	},
	view: {
		height: height,
		backgroundColor: Colors.Primary
	},
	void: {
		fontSize: 16,
		color: "black",
		marginLeft: 20,
		marginTop: 20,
	},
	details: {
		marginLeft: 20,
		marginRight: 20,
		marginTop: 30,
		flexDirection: "row",
	},
	column: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
	},
	text: {
		fontSize: 16,
		color: Colors.Details,
	},
	title: {
		fontSize: 28,
		color: Colors.Details,
		fontWeight: "bold",
		marginLeft: 20,
		marginTop: 20,
	},
	container: {
		marginTop: -30,
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		color: "black",
		fontSize: 16,
		marginBottom: 15,
		width: 300,
	}
});