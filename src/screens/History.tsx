import { Dimensions, View, ScrollView, StyleSheet, Text, ActivityIndicator } from "react-native";
import Colors from "src/Colors";
import Header from "src/components/Header";
import Arrow, { Directions, Positions } from "src/components/Arrow";
import { Vehicle } from "src/Types";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../App";
import Mission from "src/components/Mission";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
	route: {
		params: {
			vehicle: Vehicle;
			endpoint: string;
		}
	}
}

/**
 * This the history of a vehicle.
 * 
 * @param navigation - The navigation of the app.
 * @returns {JSX.Element} Rendered statistics page.
 */
export default function History({ navigation, route }: Props): JSX.Element {

	const { endpoint } = route.params;
	const [vehicle, setVehicle] = useState<Vehicle>();
	const [loading, setLoading] = useState(true);
	// @ts-ignore
	const { signOut } = useContext(AuthContext);

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
			marginTop: 30,
			flex: 1,
			flexDirection: "column",
			alignItems: "center",
		}
	});

	useEffect(() => {
		setVehicle(route.params.vehicle);
		setLoading(false);
	}, [])

	return (
		<View style={styles.view}>
			<Header />
			{loading
				? <ActivityIndicator size="large" color={Colors.Secondary} />
				: <>
					<ScrollView>
						<Text style={styles.title}>Détails du véhicule</Text>
						<View style={styles.details}>
							<View style={styles.column}>
								<Text style={[styles.text]}>Marque du véhicule  :</Text>
								<Text style={[styles.text]}>Modèle du véhicule  :</Text>
								<Text style={[styles.text]}>Couleur du véhicule :</Text>
							</View>
							<View style={styles.column}>
								<Text style={[styles.text]}>{vehicle?.model?.brand}</Text>
								<Text style={[styles.text]}>{vehicle?.model?.label}</Text>
								<Text style={[styles.text]}>{vehicle?.color}</Text>
							</View>
						</View>
						<Text style={styles.title}>Expertises réalisées</Text>
						{
							vehicle?.missions && vehicle?.missions?.length > 0
								? <View style={styles.container}>
									{vehicle?.missions.map((mission) => {
										return <Mission navigation={navigation} mission={mission} />
									})}
								</View>
								: <Text style={styles.void}>Aucune expertise n'a été réalisée.</Text>
						}
					</ScrollView>
					<Arrow direction={Directions.Left} position={Positions.Left} onPress={() => { navigation.goBack() }} />
				</>
			}
		</View>
	)
}