import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import Colors from 'src/Colors'

export enum Directions {
	Left = "L",
	Right = "R"
}

export enum Positions {
	Left = "L",
	Right = "R",
}

type Props = {
	direction: Directions,
	position: Positions,
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
export default function Arrow({ direction, position, onPress, css }: Props): JSX.Element {

	const styles = StyleSheet.create({
		container: {
			marginTop: 15,
			borderRadius: 10,
			marginBottom: 10,
			alignSelf: position === Positions.Right ? "flex-end" : "flex-start",
			...css
		},
		image: {
			resizeMode: "contain",
			aspectRatio: 1
		}
	})
	
	if (direction === Directions.Right)
	{
		styles.image = {
			...styles.image,
			// @ts-ignore
			transform: [{ rotate: "180deg" }]
		}
	} else if (position === Positions.Left) {
		styles.container = {
			...styles.container,
			// @ts-ignore
			marginLeft: 10,
			// @ts-ignore
			alignSelf: "flex-start"
		}
	}

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Image source={require("./arrow.png")} style={styles.image}/>
		</TouchableOpacity>
	);
}
