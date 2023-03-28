import { Dimensions, View, ScrollView, StyleSheet, ActivityIndicator, Text, TextInput } from "react-native";
import Navbar from "src/components/Navbar";
import Colors from "src/Colors";
import Header from "src/components/Header";
import { useEffect, useState } from "react";
import type { Stats } from "src/Types";
import { getStatistics } from "src/services/api/Stats";
import StatsCard from "src/components/StatsCard";
import SoftButton from "src/components/SoftButton";
import Modal from "react-native-modal";
import DatePicker from 'react-native-date-picker'
import Button from "src/components/Button";

const { height } = Dimensions.get("window");

type Props = {
	navigation: any;
}

/**
 * This is the statistics page of the app.
 * 
 * @param navigation - The navigation of the app.
 * @returns {JSX.Element} Rendered statistics page.
 */
export default function Statistics({ navigation }: Props): JSX.Element {

	const [loading, setLoading] = useState(true);
	const [statistics, setStatistics] = useState<Stats[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [openStartDate, setOpenStartDate] = useState(false);
	const [openEndDate, setOpenEndDate] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	useEffect(() => {
		(async () => {
			let stats = await getStatistics();
			setStatistics(stats ? stats : []);
			setLoading(false);
		})()
	}, [])

	function showStatsOnPeriod() {
		setModalVisible(false);
		navigation.navigate("period", {
			startDate: startDate.toString(), 
			endDate: endDate.toString() 
		});
	}

	return (
		<View style={styles.view}>
			<Header />
			<ScrollView style={styles.container}>
				<Text style={styles.title}>Statistiques</Text>
				{loading ? <ActivityIndicator size="large" color={Colors.Secondary} /> :
					<>
						<View style={styles.cards}>
							{
								statistics.length > 0 ?
									statistics.map((stats: Stats, index: number) => {
										return (
											<StatsCard key={index} stats={stats} />
										)
									})
									: <Text style={{ color: Colors.Details }}>Aucune statistique disponible.</Text>
							}
						</View>
					</>
				}
				<SoftButton title="Saisir une période" onPress={() => { setModalVisible(!modalVisible) }} css={{ marginTop: 40 }} />
				<SoftButton title="Plus de statistiques" onPress={() => { }} />
			</ScrollView>
			<Modal
				isVisible={modalVisible}
				style={{ height: 300 }}
				onBackdropPress={() => { setModalVisible(!modalVisible) }}
			>
				<View style={styles.modal}>
					<SoftButton title="Date de début" onPress={() => { setOpenStartDate(!openStartDate) }} />
					<SoftButton title="Date de fin" onPress={() => { setOpenEndDate(!openEndDate) }} />
					<View style={styles.period}>
						<Text style={[styles.text, styles.periodTitle]}>
							Période sélectionnée
						</Text>
						<Text style={styles.text}>
							{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
						</Text>
					</View>
					<Button title="Voir les statistiques" onPress={showStatsOnPeriod} />
				</View>
			</Modal>
			<DatePicker
				modal
				mode="date"
				title={"Sélectionner une date de début"}
				open={openStartDate}
				maximumDate={new Date()}
				date={new Date()}
				onConfirm={(date) => { setStartDate(date) }}
				onCancel={() => { setOpenStartDate(!openStartDate) }}
			/>
			<DatePicker
				modal
				title={"Sélectionner une date de fin"}
				mode="date"
				minimumDate={startDate}
				maximumDate={new Date()}
				open={openEndDate}
				date={new Date()}
				onConfirm={(date) => { setEndDate(date) }}
				onCancel={() => { setOpenEndDate(!openEndDate) }}
			/>
			<Navbar activeItem="statistics" navigation={navigation} />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		height: height,
		backgroundColor: Colors.Primary
	},
	container: {
		marginLeft: 20,
		marginRight: 20,
	},
	cards: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	title: {
		color: Colors.Details,
		fontSize: 28,
		fontWeight: "bold",
		marginTop: 10,
	},
	modal: {
		backgroundColor: Colors.Primary,
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	period: {
		marginTop: 25,
		marginBottom: 10,
	},
	text: {
		textAlign: "center",
		color: Colors.Details,
	},
	periodTitle: {
		fontWeight: "bold",
		marginBottom: 5,
	}
});
