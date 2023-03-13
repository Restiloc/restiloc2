import { Button, StyleSheet, Text } from "react-native";

/**
 * This is the landing page of the app.
 * 
 * @returns {JSX.Element} The landing page.
 */
export default function Landing(): JSX.Element {
	return (
		<Text style={styles.sectionContainer} >
			Hello, world!
			<Button 
				title="Click me!"
			/>
		</Text>
	);
}

const styles = StyleSheet.create({
	sectionContainer: {
		backgroundColor: "red",
	}
});