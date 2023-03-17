import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import Colors from 'src/Colors'

type Props = {
	title: string,
	onPress: () => void,
	css?: {}
}

/**
 * This is a custom button component.
 * 
 * @param title - The title of the button.
 * @param onPress - The onPress event of the button.
 * @returns {JSX.Element} Rendered button.
 */
export default function SoftButton({ title, onPress, css }: Props): JSX.Element {

	const styles = StyleSheet.create({
		text: {
			fontSize: 18,
			color: Colors.Details,
			fontWeight: "bold",
			alignSelf: "center",
		},
		container: {
			marginTop: 15,
			width: "100%",
			backgroundColor: Colors.SettingBackground,
			height: 75,
			borderRadius: 10,
			justifyContent: "center",
			...css
		},
	})	

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
    	<Text style={styles.text}>{ title }</Text>
		</TouchableOpacity>
	);
}
