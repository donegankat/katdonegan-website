import styles from "./Home.module.scss";

export default function Home() {
	return (
		<header className={styles.appHeader}>
			<div>
				Hi, I'm Kat
				<div className={styles.subHeader}>
					Software Engineer &amp; Team Lead
					<br />
					from Denver, Colorado
				</div>
			</div>
		</header>
	);
}