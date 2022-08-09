import SocialLinkButton from "./SocialLinkButton";
import resume from "../../resume.json"

import styles from "./SocialLinksPanel.module.scss";

export default function SocialLinksPanel() {
	const socialProfiles = resume.basics.profiles;
	var socialProfileButtons = [];

	for (var i = 0; i < socialProfiles.length; i++) {
		socialProfileButtons.push(
			<SocialLinkButton
				key={socialProfiles[i].network}
				networkName={socialProfiles[i].network}
				userName={socialProfiles[i].username}
				link={socialProfiles[i].url}
				icon={socialProfiles[i]._icon.class}
				iconSource={socialProfiles[i]._icon.source}
			/>
		);
	}

	return <div className={styles.socialLinksPanel}>{socialProfileButtons}</div>;
}