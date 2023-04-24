import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, Alert } from 'react-native'
import Colors from 'src/Colors'
import type { PrestationType } from 'src/Types';
import Modal from "react-native-modal";
import SoftButton from './SoftButton';
import { format } from 'src/Constants';

type Props = {
	prestation: PrestationType;
	isFinished: boolean;
	// onDelete: (id: number) => void;
}

/**
 * This is the prestation component.
 * 
 * @param prestation - The prestation content.
 * @returns {JSX.Element} Rendered Prestation component.
 */
export default function Prestation({ prestation, isFinished }: Props): JSX.Element {

	const [modalVisible, setModalVisible] = useState(false);

	const styles = StyleSheet.create({
		container: {
			backgroundColor: "white",
			borderRadius: 10,
			padding: 25,
			marginBottom: 6,
		},
		top : {
			flexDirection: "row",
			justifyContent: "space-between",
			verticalAlign: "center",
		},
		text: {
			color: Colors.Details,
			fontSize: 18,
			fontWeight: "bold",
		},
		modal: {
			backgroundColor: Colors.Primary,
			padding: 20,
			borderRadius: 10,
		},
		label: {
			color: Colors.Details,
			fontSize: 24,
			fontWeight: "bold",
			marginTop: 10,
			marginBottom: 10,
		},
		description: {
			color: Colors.Details,
			fontSize: 18,
			marginTop: 12,
			marginBottom: 10,
		},
		image: {
			width: 200,
			height: 200,
			resizeMode: "contain",
			marginBottom: 40,
			marginTop: 40,
			alignSelf: "center",
		}
	})

	// const confirm = () => Alert.alert(
	// 	"Remove prestation",
	// 	"Are you sure you want to remove this prestation?",
	// 	[
	// 		{
	// 			text: "Cancel",
	// 			onPress: () => console.log("Cancel Pressed"),
	// 			style: "cancel"
	// 		},
	// 		{
	// 			text: "Yes!",
	// 			onPress: () => onDelete(prestation.id),
	// 			style: "destructive"
	// 		}
	// 	],
	// 	{ cancelable: false }
	// );
	
	return (
		<TouchableOpacity
			// onLongPress={ isFinished ? () => { setModalVisible(!modalVisible) } : confirm }
			style={styles.container} 
			onPress={() => { setModalVisible(!modalVisible) }}
		>
			<View style={styles.top}>
				<Text style={styles.text}>{ prestation.label }</Text>
				<Text style={styles.text}>#{ prestation.id ?? "0" }</Text>
			</View>
			<Text style={styles.text}>{ format.description(prestation) }</Text>
			<Modal
				isVisible={modalVisible}
				style={{ height: 300 }}
				onBackdropPress={() => { setModalVisible(!modalVisible) }}
			>
				<View style={styles.modal}>
					<View style={styles.top}>
						<Text style={styles.label}>{prestation.label}</Text>
						{
							prestation.id ? (
								<Text style={styles.text}>#{ prestation.id }</Text>
							) : (
								<></>
							)
						}
					</View>
					<Text style={styles.description}>{prestation.description}</Text>
					<Image
						style={styles.image}
						source={{uri: `data:image/png;base64,${prestation.image}`}}
					/>
					{/* {
						!isFinished ? (
							<SoftButton title="Supprimer" onPress={confirm} />
						) : ( <></> )
					} */}
					<SoftButton title="Fermer" onPress={() => { setModalVisible(!modalVisible) }} />
				</View>
			</Modal>
		</TouchableOpacity>
	);
}
