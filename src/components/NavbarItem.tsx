import { Text, View, StyleSheet, Image, TouchableOpacity, GestureResponderEvent } from "react-native";
import Colors from "src/Colors";

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
			width: 25,
			height: 25,
			aspectRatio: 1,
			resizeMode: "contain",
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

	let source;

	switch (image) {
		case "planning":
			source = require("./planning.png");
			break;
		case "statistics":
			source = require("./statistics.png");
			break;
		case "settings":
			source = require("./settings.png");
			break;
		default:
			source = require("./planning.png");
			break;
	}

	if (active) {
		styles.image = {
			...styles.image,
			// @ts-ignore
			tintColor: Colors.Secondary
		}
		styles.text = {
			...styles.text,
			color: Colors.Secondary
		}
	}

	/**
	 * Redirects to the corresponding page.
	 */
	const handlePress = () => {
		navigation.navigate(title.toLowerCase());
	}

	return (
		<TouchableOpacity style={ styles.item } onPress={handlePress}>
			<Image source={ source } style={styles.image}/>
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