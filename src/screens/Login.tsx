import Button from "components/Button";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../Colors";
import Logo from "components/Logo";
import { useState, useContext } from "react";
import { AuthContext } from "./../../App";

const { height } = Dimensions.get("window");

type Credentials = {
	identifier: string,
	password: string,
}

/**
 * This is the login page of the app.
 * 
 * @param props - The props of the login page.
 * @returns {JSX.Element} Rendered login page.
 */
export default function Login(): JSX.Element {

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
		login: {
			height: height,
			backgroundColor: Colors.Primary,
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			gap: 10,
		},
		input: {
			borderWidth: 1,
			minWidth: 250,
			borderRadius: 10,
			color: "black",
			padding: 10,
		},
		container: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			gap: 10,
		},
		label: {
			color: "black",
			fontSize: 16,
			alignSelf: "flex-start",
		}
	});

	const [loginError, setLoginError] = useState(false);
	const [serverError, setServerError] = useState(false);
	const [credentials, setCredentials] = useState<Credentials>({ 
		identifier: "",
		password: "" 
	});
	
	// @ts-ignore
	const { signIn } = useContext(AuthContext);
	
	async function handleLogin() {
		try {
			let state = await signIn(credentials);
			if (!state)
				setLoginError(true);
		} catch (e) {
			setServerError(true);
		}
	}

	return (
		<View style={styles.login}>
			<Logo css={{ maxWidth: 250 }} />
			{loginError && <Text style={styles.error}>Identifiants invalides</Text>}
			{serverError && <Text style={styles.error}>Erreur de traitement...</Text>}
			<View style={styles.container}>
				<Text style={styles.label}>Email</Text>
				<TextInput 
					id="identifier"
					style={styles.input}
					placeholderTextColor={"black"}
					onChangeText={text => setCredentials({ ...credentials, identifier: text })}
				/>
				<Text style={styles.label}>Mot de passe</Text>
				<TextInput 
					id="password"
					secureTextEntry={true}
					style={styles.input}
					placeholderTextColor={"black"}
					onChangeText={text => setCredentials({ ...credentials, password: text })}
				/>
				<Button title="Login" onPress={handleLogin}/>
			</View>
		</View>
	);
}