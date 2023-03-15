import { Image, StyleSheet, View } from "react-native";

type Props = {
	minimized?: boolean;
	css?: object;
};

export default function Logo(prop: Props): JSX.Element {

	let logo = prop.minimized ? "logo-small.png" : "logo.png";
	
	const style = StyleSheet.create({
		logo: {
			...prop.css,
			aspectRatio: 1.5,
			resizeMode: "contain",
			alignSelf: "center"
		}
	});

	return (
			<Image source={ require(`./logo.png`) } style={ style.logo } />
	);
}