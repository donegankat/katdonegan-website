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
			<div className={styles.stats}>
				<div className={styles.stat}>
					<span className={styles.statNumber}>10+</span>
					<span className={styles.statLabel}>
						Years of "let me take a look"
					</span>
				</div>
				<div className={`${styles.stat} ${styles.statMiddle}`}>
					<span className={styles.statNumber}>Some Stat</span>
					<span className={styles.statLabel}>Something about it</span>
				</div>
				<div className={styles.stat}>
					<span className={styles.statNumber}>Many</span>
					<span className={styles.statLabel}>cups of coffee</span>
				</div>
			</div>
		</header>
	);
}
