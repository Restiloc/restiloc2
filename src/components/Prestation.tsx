import { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, Alert, TextInput } from 'react-native'
import Colors from 'src/Colors'
import type { PrestationEditType, PrestationType } from 'src/Types';
import Modal from "react-native-modal";
import SoftButton from './SoftButton';
import { format } from 'src/Constants';

type Props = {
	prestation: PrestationType;
	isFinished: boolean;
	onDelete: (id: number) => void;
	onEdit: (id: number, body: PrestationEditType) => Promise<void>;
}

/**
 * This is the prestation component.
 * 
 * @param prestation - The prestation content.
 * @returns {JSX.Element} Rendered Prestation component.
 */
export default function Prestation({ 
	prestation, 
	isFinished,
	onDelete,
	onEdit
}: Props): JSX.Element {

	const [modalVisible, setModalVisible] = useState(false);
	const [editstatus, setEditStatus] = useState(false);
	const [prestationDetails, setPrestationDetails] = useState({
		label: prestation.label,
		description: prestation.description,
	});

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
			maxHeight: isFinished ? 500 : 650,
			height: "100%",
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

	const confirmDelete = () => Alert.alert(
		"Remove prestation",
		"Are you sure you want to remove this prestation?",
		[
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
			},
			{
				text: "Yes!",
				onPress: () => onDelete(prestation.id),
				style: "destructive"
			}
		],
		{ cancelable: true }
	);

	const confirmEdit = () => Alert.alert(
		"Edit prestation",
		"Are you sure you want to edit this prestation?",
		[
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel"
			},
			{
				text: "Yes!",
				onPress: () => onEdit(prestation.id, prestationDetails),
				style: "destructive"
			}
		],
		{ cancelable: true }
	);

	const saveChanges = (key: string, value: string) => {
		switch (key) {
			case "label":
				setPrestationDetails({
					...prestationDetails,
					label: value
				});
				break;
			case "description":
				setPrestationDetails({
					...prestationDetails,
					description: value
				});
				break;
		}

		if (
			(prestationDetails.label !== prestation.label || prestationDetails.description !== prestation.description)
			&& (prestationDetails.label !== "" && prestationDetails.description !== "")
		) {
			setEditStatus(true);
		} else {
			setEditStatus(false);
		}
	}
	
	return (
		<TouchableOpacity
			onLongPress={ isFinished ? () => { setModalVisible(!modalVisible) } : confirmDelete }
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
						{
							isFinished ? (
								<>
									<Text style={styles.label}>{prestation.label}</Text>
									{
										prestation.id ? (
											<Text style={styles.text}>#{ prestation.id }</Text>
										) : (
											<></>
										)
									}
								</>
							) : (
								<TextInput style={styles.label} value={prestationDetails.label} onChangeText={(text) => saveChanges("label", text)} />
							)
						}
					</View>
					{
						isFinished ? (
							<Text style={styles.description}>{prestation.description}</Text>
						)	: (
							<TextInput style={styles.description} value={prestationDetails.description} onChangeText={(text) => saveChanges("description", text)} />
						)
					}
					<Image
						style={styles.image}
						source={{uri: `data:image/png;base64,${prestation.image}`}}
					/>
					{
						!isFinished ? (
							<View style={{
								flexDirection: "row",
							}}>
								<SoftButton
									title="Supprimer"
									onPress={confirmDelete}
									css={{
										width: 150
									}}
								/>
								<SoftButton 
									title="Editer"
									onPress={ !editstatus ? () => {} : confirmEdit }
									css={{
										width: 150,
										marginLeft: 6
									}} 
									disabled={!editstatus} 
								/>
							</View>
						) : ( <></> )
					}
					<SoftButton title="Fermer" onPress={() => { setModalVisible(!modalVisible) }} />
				</View>
			</Modal>
		</TouchableOpacity>
	);
}
