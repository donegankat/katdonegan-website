import { Chip } from "@mui/material";
import styles from "./Project.module.scss";

interface ProjectProps {
	name: string;
	description: string;
	repositoryUrl?: string;
	liveUrl?: string;
	tags?: string[];
}

/**
 * Builds a single project to add to the list of projects.
 */
export default function Project(props: ProjectProps) {
	/**
	 * Builds the list of tags for the project based on its keywords.
	 * @returns
	 */
	const getTags = () => {
		var tagChips = [];
		if (props.tags && props.tags.length > 0) {
			for (var tag of props.tags) {
				tagChips.push(<Chip color="primary" size="small" label={tag} />);
			}
		}

		return tagChips;
	};

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
				elements.push(<>{text.substring(startingIndex, match.index)}</>);

				// Build the link's anchor tag.
				elements.push(
					<a
						key={`project-${props.name.replace(" ", "-")}-${match.index}`}
						href={match[2]}
					>
						{match[1]}
					</a>
				);

				// Keep track of where we left off.
				startingIndex = match.index + match[0].length;
			}
		}

		// Grab whatever text may be leftover before we exit.
		elements.push(<>{text.substring(startingIndex + 1)}</>);
		
		return elements;
	};

	return (
		<div>
			<h2 className={styles.projectHeader}>{props.name}</h2>
			<div>
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
			<div className={styles.tagsContainer}>{getTags()}</div>
		</div>
	);
}