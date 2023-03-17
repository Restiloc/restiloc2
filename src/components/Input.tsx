import { View, Text, TextInput, StyleSheet } from 'react-native';

type InputProps = {
	type: string,
	id: string,
	value?: string,
	placeholder: string,
	onChange: (e: any) => void,
}

export default function Input(props: InputProps): JSX.Element {

	const styles = StyleSheet.create({
		input: {
			borderWidth: 1,
			minWidth: 250,
			borderRadius: 10,
			color: "black",
			padding: 10,
		}
	});
	
	return (
		<TextInput 
			style={styles.input}
			id={props.id}
			value={props.value}
			placeholder={props.placeholder} 
			placeholderTextColor={"black"}
			onChange={props.onChange}
		/>
	);
}