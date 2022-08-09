import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Work } from "@mui/icons-material";
import { Screens } from "../../constants/Screens";

import styles from "./Menu.module.scss";

interface MenuProps {
	selectedScreen: number;
	onSelectedScreenChange: (selectedScreen: number) => void;
}

export default function Menu(props: MenuProps) {
	const navMenuClick = (newScreen: number) => {
		props.onSelectedScreenChange(newScreen);
	}

	return (
		<BottomNavigation
			showLabels
			value={props.selectedScreen}
			onChange={(event, newValue) => {
				navMenuClick(newValue);
			}}
			className={styles.bottomMenu}
		>
			<BottomNavigationAction
				label="Home"
				icon={<Home />}
				value={Screens.Home}
			/>
			<BottomNavigationAction
				label="Projects"
				icon={<Work />}
				value={Screens.Projects}
			/>
		</BottomNavigation>
	);
}