import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import Colors from 'src/Colors'

export enum Directions {
	Left = "L",
	Right = "R"
}

type Props = {
	direction: Directions,
	onPress: () => void,
	css?: {}
}

/**
 * This is a custom button component.
 * 
 * @param direction - The direction of the arrow.
 * @param onPress - The onPress event of the arrow.
 * @returns {JSX.Element} Rendered button.
 */
export default function Arrow({ direction, onPress, css }: Props): JSX.Element {

	const styles = StyleSheet.create({
		container: {
			marginTop: 15,
			alignSelf: "flex-end",
			borderRadius: 10,
			marginBottom: 15,
			marginRight: 15,
			...css
		},
		image: {
			resizeMode: "contain",
			aspectRatio: 1,
			alignSelf: "flex-end",
		}
	})
	
	if (direction === Directions.Right)
	{
		styles.image = {
			...styles.image,
			// @ts-ignore
			transform: [{ rotate: "180deg" }]
		}
	} 

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Image source={require("./arrow.png")} style={styles.image}/>
		</TouchableOpacity>
	);
}
