import { Chip } from "@mui/material";
import styles from "./Project.module.scss";

interface ProjectProps {
	name: string;
	description: string;
	repositoryUrl?: string;
	liveUrl?: string;
	tags?: string[];
}

export default function Project(props: ProjectProps) {
	const getTags = () => {
		var tagChips = [];
		if (props.tags && props.tags.length > 0) {
			for (var tag of props.tags) {
				tagChips.push(<Chip color="primary" size="small" label={tag} />);
			}
		}

		return tagChips;
	}

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
			<div>{props.description}</div>
			<div className={styles.tagsContainer}>{getTags()}</div>
		</div>
	);
}