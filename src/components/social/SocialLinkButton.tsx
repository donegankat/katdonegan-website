import { Icon, IconButton, Link, styled, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

import styles from "./SocialLinkButton.module.scss";

interface SocialLinkButtonProps {
	networkName: string;
	userName: string;
	link: string;
	icon: string;
	iconSource: string;
}

export default function SocialLinkButton(props: SocialLinkButtonProps) {
	const SocialTooltip = styled(({ className, ...props }: TooltipProps) => (
		<Tooltip {...props} classes={{ popper: className }} />
	))(({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: "#1e88e5ba",
			boxShadow: theme.shadows[1]
		}
	}));

	return (
		<Link href={props.link} underline="none">
			<SocialTooltip
				title={`${props.networkName}: ${props.userName}`}
				placement="left"
			>
				<IconButton
					aria-label={props.networkName}
					className={styles.socialButton}
				>
					{props.iconSource === "mdi" ? (
						<Icon>{props.icon}</Icon>
					) : (
						<Icon className={props.icon}></Icon>
					)}
				</IconButton>
			</SocialTooltip>
		</Link>
	);
}