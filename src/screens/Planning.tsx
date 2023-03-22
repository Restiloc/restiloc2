import { Dimensions, ScrollView, StyleSheet, View, RefreshControl, Alert } from "react-native";
import Storage from "src/Storage";
import { useEffect, useState, useContext, useCallback } from "react";
import Navbar from "src/components/Navbar";
import Header from "src/components/Header";
import { AuthContext } from "../../App";
import Popup, { PopupType } from "src/components/Popup";
import TodayMissions from "src/components/TodayMissions";
import ExpertMissions from "src/components/ExpertMissions";
import FinishedMissions from "src/components/FinishedMissions";
import { authenticated } from "src/services/api/Auth";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
}

/**
* This is the planning page of the app.
*
* @param navigation - The navigation of the app.
* @returns {JSX.Element} The login page.
*/
export default function Planning({ navigation }: Props): JSX.Element {

	// @ts-ignore
	const { signOut } = useContext(AuthContext);
	const [welcome, setWelcome] = useState<boolean>(false);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	}, []);

	useEffect(() => {
		(async () => {
			const auth = await authenticated();
			if (!auth) signOut;
			let fromLoginScreen = await Storage.get("fromLoginScreen");
			if (fromLoginScreen) {
				console.log("Expert coming from login screen, show login success message.");
				setWelcome(true);
				await Storage.remove("fromLoginScreen");
				setTimeout(() => { setWelcome(false); }, 5000);
			}
			console.log("Expert is authenticated, getting token.");
		})()
		// const focusHanler = navigation.addListener('focus', () => {
		// 	Alert.alert('Refreshed');
		// });
		// return focusHanler;
	}, [navigation])

	return (
		<View style={styles.view}>
			<Header />
			{welcome ? <Popup type={PopupType.Success} title="Bienvenue sur Restiloc !" /> : <></>}
			<ScrollView style={styles.planning} refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
				<TodayMissions navigation={navigation} />
				<ExpertMissions navigation={navigation} />
				<FinishedMissions navigation={navigation} />
			</ScrollView>
			<Navbar activeItem="planning" navigation={navigation} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: height,
	},
	planning: {
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 20,
	},
});