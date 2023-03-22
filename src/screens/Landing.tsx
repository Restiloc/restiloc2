import { Dimensions, StyleSheet, Text, View } from "react-native";
import Button from "components/Button";
import Logo from "components/Logo";
import Colors from "../Colors";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
}

/**
 * This is the landing page of the app.
 * 
 * @param navigation - The navigation object.
 * @returns {JSX.Element} Rendered landing page.
 */
export default function Landing({ navigation }: Props): JSX.Element {

	const toLogin = () => navigation.navigate("login");

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Logo />
			</View>
			<View style={styles.bottom}>
				<Text style={styles.title}>Welcome to Restiloc!</Text>
				<Text style={styles.subtitle}>Restiloc is a platform for finding and sharing vehicles locations.</Text>
			 	<Button title="Login" onPress={toLogin} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: height,
		backgroundColor: Colors.Primary,
	},
	top: {
		height: height / 2,
		flex: 1,
		justifyContent: "center",
		backgroundColor: Colors.Primary
	},
	bottom: {
		height: height / 2,
		backgroundColor: Colors.Secondary,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 20
	},
	title: {
		fontSize: 32,
	},
	subtitle: {
		fontSize: 12,
		maxWidth: 300,
		textAlign: "center",
	}
});