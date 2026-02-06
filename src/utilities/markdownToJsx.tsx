/**
 * Parses the text provided, replaces any recognized markdown elements with HTML/JSX elements, and
 * returns an array representing the original text alongside the newly inserted JSX elements where
 * they belong inside of the string.
 * @param text 
 * @returns 
 */
export default function transformMarkdownStringToJsx(text: string) {
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
	const parsedElements = [];
	let startingIndex = 0;

	for (const element of elementsToParse) {
		if (typeof element === "string") {
			startingIndex = 0;
			let matches = element.matchAll(regexToFind);

			for (const match of matches) {
				if (match?.index && match.index > 0) {
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
						startingIndex = match.index + match[0].length;
					}
				}
			}

			// Grab whatever text may be leftover before we exit.
			parsedElements.push(element.substring(startingIndex));
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
			<a key={`link-${match.index}`} href={match[2]}>
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
	return <><br key={`break-${match.index}`} /><br key={`break2-${match.index}`} /></>;
};