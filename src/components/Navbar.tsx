import { Dimensions, View, StyleSheet } from 'react-native'
import Colors from 'src/Colors'

const { width, height } = Dimensions.get('window')

export default function Navbar(): JSX.Element {

	return (
		<View style={styles.navbar}>
			
		</View>
	)

}

const styles = StyleSheet.create({
	navbar: {
		height: 100,
		backgroundColor: Colors.Secondary
	}
})
