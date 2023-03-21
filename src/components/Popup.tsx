import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Colors from 'src/Colors';

const { width } = Dimensions.get('window');

export enum PopupType {
	Success = 'success',
	Error = 'error',
}

type Props = {
	type: PopupType;
	title: string;
}

export default function Popup({type, title}: Props): JSX.Element {

	const styles = StyleSheet.create({
		container: {
			position: 'absolute',
			top: 10,
			zIndex: 1,
			width: width - 80,
			alignSelf: 'center',
			borderRadius: 15,
			height: 80,
			backgroundColor: Colors.Primary,
			justifyContent: 'center',
			opacity: 0.9
		},
		text: {
			fontSize: 16,
			fontWeight: 'bold',
			textAlign: 'center',
			color: Colors.Primary
		}
	});

	switch (type) {
		case PopupType.Success:
			styles.container.backgroundColor = Colors.Success;
			break;
		case PopupType.Error:
			styles.container.backgroundColor = Colors.Error;
			break;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{ title }</Text>
		</View>
	)
}