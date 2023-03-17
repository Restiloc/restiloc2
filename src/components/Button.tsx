import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
	title: string,
	onPress: () => void,
}

export default function Button(props: ButtonProps): JSX.Element {

	const styles = StyleSheet.create({
		appButtonContainer: {
			marginTop: 20,
			backgroundColor: "#242B40",
			padding: 20,
			width: 220,
			borderRadius: 35,
		},
		appButtonText: {
			fontSize: 18,
			color: "#fff",
			fontWeight: "bold",
			alignSelf: "center",
		}
	});		

	return (
		<TouchableOpacity style={styles.appButtonContainer} onPress={props.onPress}>
    	<Text style={styles.appButtonText}>{ props.title }</Text>
		</TouchableOpacity>
	);
}