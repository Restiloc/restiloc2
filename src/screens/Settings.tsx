import { Dimensions, StyleSheet, View, ScrollView, Text, TextInput, ActivityIndicator } from "react-native";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./../../App";
import type { Expert, ExpertUpdate } from "../Types";
import Navbar from "src/components/Navbar";
import Storage from "src/Storage";
import Colors from "../Colors";
import Header from "src/components/Header";
import Button from "src/components/Button";
import Setting from "src/components/SoftButton";
import SoftButton from "src/components/SoftButton";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
}

/**
 * This is the settings page of the app.
 * 
 * @param navigation - The navigation of the app.
 * @returns {JSX.Element} Rendered settings page.
 */
export default function Settings({ navigation }: Props): JSX.Element {

	const styles = StyleSheet.create({
		view: {
			height: height,
			backgroundColor: Colors.Primary,
		},
		settings: {
			marginLeft: 20,
			marginRight: 20,
		},
		expert: {
			marginTop: 20,
			fontSize: 40,
			fontWeight: "bold",
			color: "black"
		},
		email: {
			fontSize: 20,
			color: "black"
		},
		title: {
			fontSize: 30,
			fontWeight: "bold",
			color: "black"
		},
		account: {
			marginTop: 40,
		},
		text: {
			fontSize: 20,
			color: "black"
		},
		logout: {
			marginTop: 20,
			flex: 1,
		},
		error: {
			color: "black",
			backgroundColor: Colors.Error,
			padding: 10,
			width: "100%",
			height: 50,
			textAlign: "center",
			marginBottom: 20,
			borderRadius: 10,
			textAlignVertical: "center",
		},
		success: {
			color: "black",
			backgroundColor: Colors.Success,
			padding: 10,
			width: "100%",
			height: 50,
			textAlign: "center",
			marginBottom: 20,
			borderRadius: 10,
			textAlignVertical: "center",
		},
		container: {
			marginTop: 20,
			flex: 1,
			flexDirection: "column",
			gap: 5,
		},
		input: {
			borderWidth: 1,
			minWidth: 250,
			borderRadius: 10,
			color: "black",
			padding: 10,
		},
		label: {
			color: "black",
			fontSize: 16,
			alignSelf: "flex-start",
		}
	});

	const [update, setUpdate] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [expert, setExpert] = useState<Expert>({} as Expert);
	const [updateError, setUpdateError] = useState<boolean>(false);
	const [serverError, setServerError] = useState<boolean>(false);
	const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
	const [noDetails, setNoDetails] = useState<boolean>(false);
	const [accountDetails, setAccountDetails] = useState({} as ExpertUpdate);

	// @ts-ignore
	const { signOut } = useContext(AuthContext);

	async function updateExpert() {
		init();
		if (Object.keys(accountDetails).length === 0) {
			console.log("No details to update");
			setNoDetails(true);
			return;
		};
		console.log("Edited details: " + accountDetails);
		if (accountDetails.phoneNumber && typeof accountDetails.phoneNumber === "string") {
			accountDetails.phoneNumber = parseInt(accountDetails.phoneNumber);
		}
		let token = await Storage.get("token");
		fetch(`https://restiloc.space/api/experts/${expert.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(accountDetails)
		}).then((response) => response.json())
			.then((data) => {
				if (data.message === "Expert updated successfully") {
					setUpdateSuccess(true);
					setUpdate(true);
				} else {
					setUpdateError(true);
				}
			}).catch(() => {
				setServerError(true);
			})
	}

	function init() {
		setUpdateError(false);
		setServerError(false);
		setUpdateSuccess(false);
		setNoDetails(false);
	}

	useEffect(() => {
		(async () => {
			let token = await Storage.get("token");
			fetch("https://restiloc.space/api/me", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Authorization": `Bearer ${token}`
				}
			}).then((response) => response.json())
				.then((data: Expert) => {
					if (data.message === "Unauthenticated.") {
						console.error("Invalid token...");
						signOut();
						return;
					}
					setExpert(data);
					setLoading(false);
				})
		})()
		setUpdate(false);
	}, [update])

	return (
		<View style={styles.view}>
			<Header />
			<ScrollView style={styles.settings}>
				<Text style={styles.expert}>{expert.lastName} {expert.firstName}</Text>
				<Text style={styles.email}>{expert.email}</Text>
				<View style={styles.account}>
					{loading ? <ActivityIndicator size="large" color={Colors.Secondary} /> : (
						<>
							<Text style={styles.title}>Mes informations</Text>
							<View style={styles.container}>
								{noDetails && <Text style={styles.error}>Aucune modification effectuée</Text>}
								{updateError && <Text style={styles.error}>La modification a échouée...</Text>}
								{serverError && <Text style={styles.error}>Erreur de traitement...</Text>}
								{updateSuccess && <Text style={styles.success}>Modification effectuée avec succès !</Text>}
								<Text style={styles.label}>Nom</Text>
								<TextInput
									id="lastname"
									style={styles.input}
									placeholderTextColor={"black"}
									defaultValue={expert.lastName}
									onChangeText={text => setAccountDetails({ ...accountDetails, lastName: text })}
								/>
								<Text style={styles.label}>Prenom</Text>
								<TextInput
									id="firstname"
									style={styles.input}
									placeholderTextColor={"black"}
									defaultValue={expert.firstName}
									onChangeText={text => setAccountDetails({ ...accountDetails, firstName: text })}
								/>
								<Text style={styles.label}>Email</Text>
								<TextInput
									id="email"
									style={styles.input}
									placeholderTextColor={"black"}
									defaultValue={expert.email}
									onChangeText={text => setAccountDetails({ ...accountDetails, email: text })}
								/>
								<Text style={styles.label}>Téléphone</Text>
								<TextInput
									id="telephone"
									style={styles.input}
									placeholderTextColor={"black"}
									defaultValue={expert.phoneNumber}
									onChangeText={text => setAccountDetails({ ...accountDetails, phoneNumber: text })}
								/>
								<SoftButton title="Sauvegarder" onPress={updateExpert} />
								<SoftButton title="Se déconnecter" onPress={signOut} css={{ marginBottom: 20 }} />
							</View>
						</>
					)}
				</View>
			</ScrollView>
			<Navbar activeItem="settings" navigation={navigation} />
		</View>
	)
}