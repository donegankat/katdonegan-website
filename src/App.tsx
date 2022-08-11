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
	const [previousScreen, setPreviousScreen] = React.useState(Screens.Home);

	const onScreenChange = (selectedScreen: number) => {
		setPreviousScreen(currentScreen);
		setCurrentScreen(selectedScreen);
	}

	const determineScreenSlideInDirection = (screenToDetermine: number) => {
		const screensValues = Object.values(Screens);

		// Always enter and exit from the correct side for the 1st and last screens, but any screens in-between
		// should enter and exit according to whichever direction the incoming screen is coming from.
		if (screenToDetermine === screensValues[0]) {
			return "right";
		} else if (screenToDetermine === screensValues[screensValues.length]) {
			return "left";
		} else if (previousScreen < currentScreen) {
			// This logic looks like it can be combined with the statement below, but just don't. Seriously.
			return previousScreen < screenToDetermine ? "left" : "right";
		}
		return previousScreen > screenToDetermine ? "right" : "left";
	}

	const buildScreenTransitioner = (
		screen: number,
		component: ReactNode
	) => {
		return (
			<Slide
				in={currentScreen === screen}
				direction={determineScreenSlideInDirection(screen)}
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
				{buildScreenTransitioner(Screens.Home, <Home />)}
				{buildScreenTransitioner(Screens.Projects, <Projects />)}
				<SocialLinksPanel></SocialLinksPanel>
			</div>
			<Menu
				selectedScreen={currentScreen}
				onSelectedScreenChange={onScreenChange}
			></Menu>
		</>
	);
}