import { Image, StyleSheet } from "react-native";

type Props = {
	minimized?: boolean;
	css?: object;
};

/**
 * This is the logo of the app.
 * 
 * @param minimized - If the logo should be minimized.
 * @param css - Add custom css to the logo.
 * @returns 
 */
export default function Logo({ minimized, css }: Props): JSX.Element {

	let logo = minimized ? require("./logo-small.png") : require("./logo.png");
	
	const style = StyleSheet.create({
		logo: {
			resizeMode: "contain",
			aspectRatio: 1.5,
			alignSelf: "center",
			...css
		}
	});

	return (
			<Image source={logo} style={ style.logo } />
	);
}