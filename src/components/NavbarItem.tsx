import { Text, View, StyleSheet, Image, TouchableOpacity, GestureResponderEvent } from "react-native";
import Colors from "src/Colors";

type NavbarItemProps = {
	title: string,
	image: string,
	active: boolean,
	navigation: any
}

export default function NavbarItem(props: NavbarItemProps): JSX.Element {

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

	let image;

	switch (props.image) {
		case "planning":
			image = require("./planning.png");
			break;
		case "statistics":
			image = require("./statistics.png");
			break;
		case "settings":
			image = require("./settings.png");
			break;
		default:
			image = require("./planning.png");
			break;
	}

	if (props.active) {
		styles.image = {
			...styles.image,
			tintColor: Colors.Secondary
		}
		styles.text = {
			...styles.text,
			color: Colors.Secondary
		}
	}

	const handlePress = (e: GestureResponderEvent) => {
		if (props.navigation?.navigate) {
			// call the navigate method
			props.navigation.navigate(props.title.toLowerCase());
		} else {
			console.error('Navigation object is not defined.');
		}	
	}

	return (
		<TouchableOpacity style={ styles.item } onPress={handlePress}>
			<Image source={ image } style={styles.image}/>
			<Text style={styles.text}>
				{ props.title ?? "NavbarItem" }
			</Text>
			{props.active ? (
          <>
						<View style={styles.activeTab}></View>
          </>
        ) : (
          <></>
        )}     
		</TouchableOpacity>
	);
}