import { Dimensions, StyleSheet, Text, View } from "react-native";
import Button from "components/Button";
import Logo from "components/Logo";
import Colors from "../Colors";
import { useState } from "react";

const { height } = Dimensions.get("window");

type LandingProps = {
	navigation: any;
}

/**
 * This is the landing page of the app.
 * 
 * @returns {JSX.Element} The landing page.
 */
export default function Landing(props: LandingProps): JSX.Element {

	const [token, setToken] = useState(null);

	const toLogin = () => props.navigation.navigate("login");

	return (
		<View style={styles.landing}>
			<View style={styles.top}>
				<Logo />
			</View>
			<View style={styles.bot}>
				<Text style={styles.bot.title}>Welcome to Restiloc!</Text>
				<Text style={styles.bot.subtitle}>Restiloc is a platform for finding and sharing vehicles locations.</Text>
			 	<Button title="Login" onPress={toLogin} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	landing: {
		height: height,
		backgroundColor: Colors.Primary,
	},
	top: {
		height: height / 2,
		flex: 1,
		justifyContent: "center",
		backgroundColor: Colors.Primary
	},
	bot: {
		height: height / 2,
		backgroundColor: Colors.Secondary,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
		title: {
			fontSize: 32,
		},
		subtitle: {
			fontSize: 12,
			maxWidth: 300,
			textAlign: "center",
		}
	},
});