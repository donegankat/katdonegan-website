import resume from "../../resume.json";
import transformMarkdownStringToJsx from "../../utilities/markdownToJsx";

import styles from "./Home.module.scss";

export default function Home() {
	return (
		<header className={styles.appHeader}>
			<div>
				Hi, I'm Kat
				<div className={styles.subHeader}>
					{transformMarkdownStringToJsx(resume.basics.summary)}
				</div>
			</div>
		</header>
	);
}