import styles from "./Home.module.scss";

export default function Home() {
	return (
		<header className={styles.hero}>
			<h1 className={styles.name}>Kat Donegan</h1>
			<div className={styles.subtitle}>
				Technical Lead, Problem Untangler, Compulsive Improver
			</div>
			<div className={styles.punchLines}>
				<p>
					Builder of systems. Translator to humans. Occasionally both at once
				</p>
				<p>
					Detail-oriented to a fault (seriously, ask my team - they have
					stories)
				</p>
			</div>
		</header>
	);
}
