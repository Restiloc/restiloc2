import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
	title: string,
	onPress: () => void,
}

/**
 * This is a custom button component.
 * 
 * @param title - The title of the button.
 * @param onPress - The onPress event of the button.
 */
export default function Button({ title, onPress }: Props): JSX.Element {

	const styles = StyleSheet.create({
		appButtonContainer: {
			marginTop: 20,
			backgroundColor: "#242B40",
			padding: 20,
			width: 250,
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
		<TouchableOpacity style={styles.appButtonContainer} onPress={onPress}>
    	<Text style={styles.appButtonText}>{ title }</Text>
		</TouchableOpacity>
	);
}