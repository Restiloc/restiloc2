import { Image, StyleSheet, View } from "react-native";

type Props = {
	minimized?: boolean;
	css?: object;
};

export default function Logo(prop: Props): JSX.Element {

	let logo = prop.minimized ? require("./logo-small.png") : require("./logo.png");
	
	const style = StyleSheet.create({
		logo: {
			resizeMode: "contain",
			aspectRatio: 1.5,
			alignSelf: "center",
			...prop.css
		}
	});

	return (
			<Image source={logo} style={ style.logo } />
	);
}