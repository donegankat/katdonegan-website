import styles from "./Background.module.scss";

export default function Background() {
	var particleOrbs = [];

	for (var i = 0; i < 20; i++) {
		particleOrbs.push(
			<div key={`orb-${i}`} className={styles.orbContainer}>
				<div className={styles.orb}></div>
			</div>
		);
	}

	return <div className={styles.appBackground}>{particleOrbs}</div>;
}