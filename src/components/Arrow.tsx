import { StyleSheet, TouchableOpacity } from 'react-native'
import Colors from 'src/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons';

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
export default function Arrow({ direction = Directions.Left, position = Positions.Left, onPress, css }: Props): JSX.Element {

	const styles = StyleSheet.create({
		container: {
			marginTop: 15,
			borderRadius: 10,
			marginBottom: 10,
			alignSelf: position === Positions.Right ? "flex-end" : "flex-start",
			...css
		},
		image: {
			color: Colors.Details
		}
	})
	
	if (direction === Directions.Left)
	{
		styles.image = {
			...styles.image,
			// @ts-ignore
			marginLeft: 10,
			transform: [{ rotate: '180deg' }]
		}
	} else if (position === Positions.Right) {
		styles.container = {
			...styles.container,
			// @ts-ignore
			marginRight: 10,
			marginLeft: 10
		}
	}

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Icon name="arrow-right-alt" size={50} style={styles.image} />
		</TouchableOpacity>
	);
}
