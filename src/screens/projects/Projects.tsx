import Project from "../../components/project/Project";
import resume from "../../resume.json";

import styles from "./Projects.module.scss";

export default function Projects() {
	const projects = resume.projects;
	var projectsElements = [];

	for (var i = 0; i < projects.length; i++) {
		projectsElements.push(
			<Project
				key={projects[i]._identifier}
				name={projects[i].name}
				description={projects[i].description}
				repositoryUrl={projects[i].url}
				liveUrl={projects[i]._liveUrl}
				tags={projects[i].keywords}
				icon={projects[i]._icon.class}
				iconSource={projects[i]._icon.source}
			/>
		);
	}

	return (
		<div className={styles.projectsPanel}>
			{projectsElements}
		</div>
	);
}