import { Image, StyleSheet } from "react-native";
import Logo from "./Logo";

type Props = {};

export default function Header(prop: Props): JSX.Element {
	return (
			<Logo minimized={true} css={
				{
					alignSelf: "auto",
					width: 100,
					height: 100,
					marginTop: 10,
					marginLeft: 10,
					aspectRatio: 1,
				}
			}/>
	);
}