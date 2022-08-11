import { Chip, Icon } from "@mui/material";
import transformMarkdownStringToJsx from "../../utilities/markdownToJsx";

import styles from "./Project.module.scss";

interface ProjectProps {
	name: string;
	description: string;
	repositoryUrl?: string;
	liveUrl?: string;
	tags?: string[];
	icon?: string;
	iconSource?: string;
}

/**
 * Builds a single project to add to the list of projects.
 */
export default function Project(props: ProjectProps) {
	/**
	 * Loads the metadata-specified icon according to whichever approach is appropriate for the icon's source.
	 * @returns
	 */
	const buildProjectIcon = () => {
		var iconClassName = styles.projectIcon;
		var content;

		if (props.iconSource && props.iconSource === "mdi") {
			// Material Design
			content = <>{props.icon}</>;
		} else if (props.iconSource && props.iconSource === "img") {
			// Image file
			iconClassName += ` ${styles.imgIcon}`;
			content = <img src={props.icon} alt={props.name} />;
		} else {
			// Other, e.g. FontAwesome
			iconClassName += ` ${props.icon}`;
			content = <></>;
		}

		return <Icon className={iconClassName}>{content}</Icon>;
	};

	/**
	 * Builds the list of tags for the project based on its keywords.
	 * @returns
	 */
	const buildTagChips = () => {
		var tagChips = [];
		if (props.tags && props.tags.length > 0) {
			for (var tag of props.tags) {
				tagChips.push(
					<Chip key={`tag-${tag}`} color="primary" size="small" label={tag} />
				);
			}
		}

		return tagChips;
	};

	return (
		<div className={styles.project}>
			<h2 className={styles.projectHeader}>
				{buildProjectIcon()}
				{props.name}
			</h2>
			<div className={styles.linksContainer}>
				{props.liveUrl && (
					<a href={props.liveUrl} title={`Homepage for ${props.name}`}>
						See it Live
					</a>
				)}
				{props.repositoryUrl && props.liveUrl && <>&nbsp;&bull;&nbsp;</>}
				{props.repositoryUrl && (
					<a href={props.repositoryUrl} title={`Respository for ${props.name}`}>
						GitHub Repository
					</a>
				)}
			</div>
			<div>{transformMarkdownStringToJsx(props.description)}</div>
			<div className={styles.tagsContainer}>{buildTagChips()}</div>
		</div>
	);
}