import { View, StyleSheet } from 'react-native'
import Colors from 'src/Colors'
import NavbarItem from './NavbarItem'

type Props = {
	navigation?: any,
	activeItem: string
}

export default function Navbar({ navigation, activeItem }: Props): JSX.Element {

	const styles = StyleSheet.create({
		navbar: {
			height: 100,
			backgroundColor: Colors.Details,
			flexDirection: 'row',
			justifyContent: 'space-around',
		}
	})
	
	const items = ["Planning", "Statistics", "Settings"];

	return (
		<View style={styles.navbar}>
			{ items.map((item, index) => <NavbarItem key={index} title={item} image={item.toLowerCase()} active={item.toLowerCase() === activeItem} navigation={navigation} />) }
		</View>
	)
}
