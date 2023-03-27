import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "src/Colors";
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
	title: string,
	image: string,
	active: boolean,
	navigation: any
}

/**
 * This is the navbar item component.
 * 
 * @param title - The title of the navbar item.
 * @param image - The image of the navbar item.
 * @param active - If the navbar item is active.
 * @param navigation - The navigation object.
 * @returns JSX.Element - Rendered navbar item.
 */
export default function NavbarItem({ title, image, active, navigation }: Props): JSX.Element {

	const styles = StyleSheet.create({
		item: {
			maxWidth: 100,
			width: 100,
			flex: 1,
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			gap: 5,
		},
		image: {
		},
		text: {},
		activeTab: {
			position: "absolute",
			bottom: 0,
			backgroundColor: Colors.Secondary,
			height: 3,
			width: "75%",
		}
	})

	if (active) {
		styles.image = {
			...styles.image,
			// @ts-ignore
			color: Colors.Secondary
		}
		styles.text = {
			...styles.text,
			color: Colors.Secondary
		}
	}

	let icon;

	switch (image) {
		case "statistics":
			icon = <Icon name="bar-chart" size={25} style={styles.image} />;
			break;
		case "settings":
			icon = <Icon name="settings" size={25} style={styles.image} />;
			break;
		default:
			icon = <Icon name="view-agenda" size={25} style={styles.image} />;
			break;
	}
	/**
	 * Redirects to the corresponding page.
	 */
	const handlePress = () => {
		navigation.navigate(title.toLowerCase());
	}

	return (
		<TouchableOpacity style={ styles.item } onPress={handlePress}>
			{ icon }
			<Text style={styles.text}>
				{ title ?? "NavbarItem" }
			</Text>
			{active ? (
          <>
						<View style={styles.activeTab}></View>
          </>
        ) : (
          <></>
        )}     
		</TouchableOpacity>
	);
}