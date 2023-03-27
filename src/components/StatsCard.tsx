import { StyleSheet, View, Text } from "react-native"
import type { Stats } from "src/Types"
import Colors from "src/Colors";
import CountIcon from "./CountIcon";

type Props = {
	stats: Stats
}

export default function StatsCard({ stats }: Props) {
	return (
		<View style={styles.card}>
			<View style={{marginLeft: 20, marginRight: 12}}>
				<View style={styles.top}>
					<Text style={styles.count}>{stats.count}</Text>
					<CountIcon count={stats.count}/>
				</View>
				<Text style={styles.text}>{stats.reason.label}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		width: 165,
		height: 130,
		borderRadius: 10,
		marginTop: 12,
		justifyContent: "center",
	},
	top: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	count: {
		fontSize: 40,
		fontWeight: "bold",
		color: Colors.Details,
	},
	text: {
		fontSize: 12,
		color: "black",
		fontWeight: "300",
	}
});