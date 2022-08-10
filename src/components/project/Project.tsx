import { Chip, Icon } from "@mui/material";
import { convertToObject, JsxElement } from "typescript";
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
	const parseMarkdown = (text: string) => {
		// Parse and handle links.
		const parsedMarkdownWithLinks = findAndReplaceMarkdownTextWithHtml(
			[text],
			// Find all portions of the string which match the pattern "[some text](some link)", capture
			// the text and link values, and use those to build HTML anchor elements for the links.
			/\[([^\]]*)\]\(([^)]*)\)/gim,
			buildMarkdownLink
		);

		// Parse and handle line breaks.
		const parsedMarkdownWithLineBreaks = findAndReplaceMarkdownTextWithHtml(
			parsedMarkdownWithLinks,
			/(<br\s?\/>)/gim,
			buildMarkdownLineBreak
		);

		return parsedMarkdownWithLineBreaks;
	};

	/**
	 * Performs a generic scan of the given content and searches for the provided regex, replaces it
	 * as needed, and returns the result as an array of elements to render on the screen.
	 * Each match it finds will have the surrounding, normal text content preserved, but the matching
	 * content will be replaced by the element(s) built by the provided builder function.
	 * @param elementsToParse
	 * @param regexToFind
	 * @param buildReplacementElement
	 * @returns
	 */
	const findAndReplaceMarkdownTextWithHtml = (
		elementsToParse: (string | JSX.Element)[],
		regexToFind: RegExp,
		buildReplacementElement: (match: RegExpMatchArray) => JSX.Element | null
	) => {
		var parsedElements = [];
		var startingIndex = -1;

		for (const element of elementsToParse) {
			if (typeof element === "string") {
				var matches = element.matchAll(regexToFind);

				for (const match of matches) {
					if (match && match.index && match.index > 0) {
						const replacementElement = buildReplacementElement(match);

						// Something might've failed an additional check in the builder function, so
						// check the return from that first before proceeding.
						if (
							replacementElement &&
							replacementElement !== null &&
							replacementElement !== undefined
						) {
							// Grab all text that came before the break we just found.
							parsedElements.push(
								element.substring(startingIndex, match.index)
							);

							// Add the replacement tag.
							parsedElements.push(replacementElement);

							// Keep track of where we left off.
							startingIndex = match.index + match[0].length - 1;
						}
					}
				}

				// Grab whatever text may be leftover before we exit.
				parsedElements.push(element.substring(startingIndex + 1));
			} else {
				// No need to change any previously parsed elements.
				parsedElements.push(element);
			}
		}

		return parsedElements;
	};

	/**
	 * Generic helper function that's passed in when parsing markdown and performing replacements for links.
	 * @param match
	 * @returns An HTML anchor tag element or null if the match doesn't meet the correct criteria.
	 */
	const buildMarkdownLink = (match: RegExpMatchArray) => {
		if (match.length === 3) {
			return (
				<a key={`description-link-${match.index}`} href={match[2]}>
					{match[1]}
				</a>
			);
		}

		return null;
	};

	/**
	 * Generic helper function that's passed in when parsing markdown and performing replacements for line breaks.
	 * @param match
	 * @returns An HTML line break element.
	 */
	const buildMarkdownLineBreak = (match: RegExpMatchArray) => {
		// Build the break.
		return <p />;
	};

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
			<div>{parseMarkdown(props.description)}</div>
			<div className={styles.tagsContainer}>{buildTagChips()}</div>
		</div>
	);
}