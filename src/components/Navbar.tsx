import { Dimensions, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Colors from 'src/Colors'
import NavbarItem from './NavbarItem'

type NavbarProps = {
	navigation?: any,
	activeItem: string
}

export default function Navbar(props: NavbarProps): JSX.Element {

	let items = ["Planning", "Statistics", "Settings"];

	const navigateTo = (tab: string) => {
		props.navigation.navigate("statistics")
	}

	return (
		<View style={styles.navbar}>
			{ items.map((item, index) => <NavbarItem key={index} title={item} image={item.toLowerCase()} active={item.toLowerCase() === props.activeItem} navigation={props.navigation} />) }
		</View>
	)

}

const styles = StyleSheet.create({
	navbar: {
		height: 100,
		backgroundColor: Colors.Details,
		flexDirection: 'row',
		justifyContent: 'space-around',
	}
})
