import { Dimensions, View, ScrollView, StyleSheet, Text, ActivityIndicator } from "react-native";
import Colors from "src/Colors";
import Header from "src/components/Header";
import Arrow, { Directions } from "src/components/Arrow";
import { Vehicle } from "src/Types";
import { useEffect, useState, useContext } from "react";
import Storage from "src/Storage";
import { AuthContext } from "../../App";

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
			height: height - 350,
			textAlign: "center",
			textAlignVertical: "center",
			color: Colors.Secondary,
			fontSize: 30,
			fontWeight: "bold",
		}
	});

	useEffect(() => {
		(async () => {
			let token = await Storage.get("token");
			fetch(`${endpoint}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `Bearer ${token}`
				}
			}).then((response) => {
				if (!response.ok) {
					setVehicle(route.params.vehicle);
				}
				return response.json()
			})
				.then((data: Vehicle) => {
					if (data.message === "Unauthenticated.") {
						console.log("Token is invalid. Redirecting to login page.")
						signOut();
						return;
					}
					setVehicle(data);
					setLoading(false);
				})
		})()
	}, [])

	console.log(vehicle)

	return (
		<View style={styles.view}>
			<Header />
			{loading
				? <ActivityIndicator size="large" color={Colors.Secondary} />
				: <>
					<ScrollView>
						<Text style={styles.void}>Coming soon...</Text>
					</ScrollView>
					<Arrow direction={Directions.Left} onPress={() => { navigation.goBack() }} />
				</>
			}
		</View>
	)
}