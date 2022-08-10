import { Chip, Icon } from "@mui/material";
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
	 * Returns an array of elements to render on the screen. Normal text is returned as-is, but
	 * this method also parses the text provided and searches for any links which use markdown
	 * syntax. Markdown links are returned as HTML anchor tags instead of normal text.
	 * @param text
	 * @returns
	 */
	const parseMarkdownLinks = (text: string) => {
		var elements = [];
		var startingIndex = 0;

		// Find all portions of the string which match the pattern "[some text](some link)", capture
		// the text and link values, and use those to build HTML anchor elements for the links.
		var matches = text.matchAll(/\[([^\]]*)\]\(([^)]*)\)/gim);
		for (const match of matches) {
			if (match && match.index && match.index > 0 && match.length === 3) {
				// Grab all text that came before the link we just found.
				elements.push(text.substring(startingIndex, match.index));

				// Build the link's anchor tag.
				elements.push(
					<a key={`description-link-${match.index}`} href={match[2]}>
						{match[1]}
					</a>
				);

				// Keep track of where we left off.
				startingIndex = match.index + match[0].length;
			}
		}

		// Grab whatever text may be leftover before we exit.
		elements.push(text.substring(startingIndex + 1));

		return elements;
	};

	/**
	 * Loads the MD-specified icon according to whichever approach is appropriate for the icon's source.
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
			<div>{parseMarkdownLinks(props.description)}</div>
			<div className={styles.tagsContainer}>{buildTagChips()}</div>
		</div>
	);
}