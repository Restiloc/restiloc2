import Button from "components/Button";
import Input from "components/Input";
import { Dimensions, SectionList, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../Colors";
import Logo from "components/Logo";
import { useEffect, useState, useContext, useMemo } from "react";
import Storage from "src/Storage";
import { AuthContext } from "./../../App";

const { width, height } = Dimensions.get("window");

type LoginProps = {
	navigation: any;
}

type Credentials = {
	identifier: string,
	password: string,
}

/**
 * This is the login page of the app.
 * 
 * @returns {JSX.Element} The login page.
 */
export default function Login(props: LoginProps): JSX.Element {

	const [loginError, setLoginError] = useState(false);
	const [serverError, setServerError] = useState(false);
	const [credentials, setCredentials] = useState<Credentials>({ identifier: "ale.hen", password: "password123" });
	
	const { signIn } = useContext(AuthContext);
	
	const handleLogin = async () => {
		try {
			let state = await signIn(credentials);
			if (!state) setLoginError(true);
		} catch (e) {
			setServerError(true);
		}
	}

	return (
		<View style={styles.login}>
			<Logo css={{ maxWidth: 250 }} />
			{loginError && <Text style={styles.error}>Invalid credentials</Text>}
			{serverError && <Text style={styles.error}>Server error</Text>}
			<TextInput 
				id="identifier"
				style={styles.input}
				placeholderTextColor={"black"}
				onChangeText={text => setCredentials({ ...credentials, identifier: text })}
			/>
			<TextInput 
				id="password"
				style={styles.input}
				placeholderTextColor={"black"}
				onChangeText={text => setCredentials({ ...credentials, password: text })}
			/>
			<Button title="Login" onPress={handleLogin}/>
		</View>
	);
}

const styles = StyleSheet.create({
	error: {
		color: "black",
		backgroundColor: "#FF9797",
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
	}
});