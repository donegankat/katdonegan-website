import SocialLinksPanel from "./components/social/SocialLinksPanel";
import logo from "./logo.svg";
import Menu from "./components/menu/Menu";
import Projects from "./screens/projects/Projects";
import React, { ReactNode } from "react";
import { Screens } from "./constants/Screens";
import { ButtonBase, Fade, Slide } from "@mui/material";
import Home from "./screens/home/Home";

import styles from "./App.module.scss";

export default function App() {
	const [currentScreen, setCurrentScreen] = React.useState(Screens.Home);

	const onScreenChange = (selectedScreen: number) => {
		setCurrentScreen(selectedScreen);
	}

	const buildScreenTransitioner = (
		screen: number,
		component: ReactNode,
		direction: "up" | "down" | "right" | "left"
	) => {
		return (
			<Slide
				in={currentScreen === screen}
				direction={direction}
				{...{
					timeout: {
						enter: 1000,
						exit: 1000
					},
					easing: {
						enter: "cubic-bezier(0.4, 0, 0.4, 1)",
						exit: "cubic-bezier(0.4, 0, 0.4, 1)"
					}
				}}
				style={{
					position: "fixed"
				}}
				unmountOnExit // Improves performance on mobile.
				appear={false} // On first load of the app, don't make the home screen slide in. Do still fade it in, though.
			>
				<div className={styles.transitionContainer}>
					<Fade
						in={currentScreen === screen}
						{...{ timeout: 1000 }}
						style={{
							position: "relative"
						}}
						unmountOnExit // Improves performance on mobile.
					>
						<div className={styles.transitionContainer}>{component}</div>
					</Fade>
				</div>
			</Slide>
		);
	};

	return (
		<>
			<div className={styles.app}>
					<ButtonBase
						className={styles.logo}
						onClick={() => onScreenChange(Screens.Home)}
					>
						<img src={logo} alt="Kat Donegan" />
					</ButtonBase>
				{buildScreenTransitioner(Screens.Home, <Home />, "right")}
				{buildScreenTransitioner(Screens.Projects, <Projects />, "left")}
				<SocialLinksPanel></SocialLinksPanel>
			</div>
			<Menu
				selectedScreen={currentScreen}
				onSelectedScreenChange={onScreenChange}
			></Menu>
		</>
	);
}