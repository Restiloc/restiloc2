// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet } from 'react-native';

type Props = {
	count: number;
}

export default function CountIcon({ count }: Props) {

	const styles = StyleSheet.create({
		item: {
			width: 25,	
			height: 25,
			borderRadius: 25,
			backgroundColor: count > 10 ? "#d8606c" : "#6df2cc",
			justifyContent: "center",
			alignItems: "center",
			marginTop: 10,
		},
		icon: {
			transform: [{ rotate: (count < 10 ? "90deg" : "-90deg") }]
		}
	})

	return (
		<View style={styles.item}>	
			<Icon name="arrow-right-alt" size={18} color="white" style={styles.icon}/>
		</View>
	)
}