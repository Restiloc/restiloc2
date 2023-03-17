import Logo from "./Logo";

/**
 * This is the header component.
 * 
 * @returns JSX.Element - Rendered header component.
 */
export default function Header(): JSX.Element {
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