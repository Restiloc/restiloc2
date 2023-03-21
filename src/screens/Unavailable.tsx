import { Dimensions, View, ScrollView, StyleSheet, Text, ActivityIndicator } from "react-native";
import Colors from "src/Colors";
import Header from "src/components/Header";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import { MissionType, Vehicle } from "src/Types";
import { useEffect, useState, useContext } from "react";
import Storage from "src/Storage";
import { AuthContext } from "../../App";
import Mission from "src/components/Mission";
import Button from "src/components/Button";
import DropdownSelect from "react-native-input-select";

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
 * This the history of a vehicle.
 * 
 * @param navigation - The navigation of the app.
 * @returns {JSX.Element} Rendered statistics page.
 */
export default function Unavailable({ navigation, route }: Props): JSX.Element {

	const [loading, setLoading] = useState(true);
	const [missions, setMissions] = useState<MissionType[]>([]);
	const [unavailabilities, setUnavailabilities] = useState<string[]>([]);
	const [reason, setReason] = useState<string>("");
	
	const styles = StyleSheet.create({
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

	useEffect(() => {
		(async () => {
			const token = await Storage.get("token");
			fetch('https://restiloc.space/api/reasons', {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then((response) => response.json())
			.then((json) => {
				setUnavailabilities(json);
				setLoading(false);
			})
		})()
		// @ts-ignore
		setMissions(route.params.mission);
		setLoading(false);
	}, [])

	const submitUnavailability = async () => {
		console.log(reason)
	}

	return (
		<View style={styles.view}>
			<Header />
			<View style={styles.container}>
				{
					loading 
					? <ActivityIndicator size="large" color={Colors.Details} />
					: <>
						<Text style={styles.label}>Motif d'indisponibilité</Text>
						<DropdownSelect
							isMultiple={false}
							isSearchable={false}
							dropdownContainerStyle={{ width: 300 }}
							checkboxLabelStyle={{ color: "black" }}
							placeholder="Sélectionnez un motif"
							options={unavailabilities}
							optionLabel={'label'}
							optionValue={'id'}
							selectedValue={''}
							onValueChange={(text: string) => { setReason(text) }}
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