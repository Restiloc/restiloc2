import { Dimensions, ScrollView, StyleSheet, View, RefreshControl, ActivityIndicator } from "react-native";
import Storage from "src/services/Storage";
import { useEffect, useState, useContext, useCallback } from "react";
import Navbar from "src/components/Navbar";
import Header from "src/components/Header";
import { AuthContext } from "../../App";
import Popup, { PopupType } from "src/components/Popup";
import TodayMissions from "src/components/TodayMissions";
import { authenticated } from "src/services/api/Auth";
import SoftButton from "src/components/SoftButton";
import Colors from "src/Colors";
import { ClosedMissionType } from "src/Types";
import { format } from "src/Constants";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
	route: {
		params: {
			closedMission?: ClosedMissionType
		}
	}
}

/**
* This is the planning page of the app.
*
* @param navigation - The navigation of the app.
* @returns {JSX.Element} The login page.
*/
export default function Planning({ navigation, route }: Props): JSX.Element {

	// @ts-ignore
	const { signOut } = useContext(AuthContext);
	const [welcome, setWelcome] = useState<boolean>(false);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const { closedMission } = route.params ?? false;

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
			}
			console.log("Expert is authenticated, getting token.");
		})()
	}, [])

	return (
		<View style={styles.view}>
			<Header />
			{welcome ? <Popup type={PopupType.Success} title="Bienvenue sur Restiloc !" /> : <></>}
			{closedMission && closedMission.state ? <Popup type={PopupType.Success} title={format.refreshTitle(closedMission)} /> : <></>}
			<ScrollView style={styles.planning} refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}>
				{
					refreshing ? <ActivityIndicator size="large" color={Colors.Secondary} style={{ marginTop: 120 }} /> : <>
						<TodayMissions navigation={navigation} />
						<SoftButton title="Toutes les missions" onPress={() => navigation.navigate("missions")} css={{marginTop: 40}}/>
						<SoftButton title="Missions terminées" onPress={() => navigation.navigate("finishedMissions")} />
					</>
				}
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