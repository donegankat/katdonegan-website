import { ButtonProps, Icon, IconButton, Link, styled, Tooltip, tooltipClasses, TooltipProps, Zoom } from "@mui/material";
import { blue } from "@mui/material/colors";

import styles from "./SocialLinkButton.module.scss";

interface SocialLinkButtonProps {
	networkName: string;
	userName: string;
	link: string;
	icon: string;
	iconSource: string;
}

export default function SocialLinkButton(props: SocialLinkButtonProps) {
	/**
	 * Custom styled version of the Material UI Tooltip.
	 */
	const SocialTooltip = styled(({ className, ...props }: TooltipProps) => (
		<Tooltip
			{...props}
			classes={{ popper: className }}
			TransitionComponent={Zoom}
		/>
	))(({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: blue[600],
			boxShadow: theme.shadows[1]
		}
	}));

	/**
	 * Custom styled version of the Material UI IconButton.
	 */
	const SocialButton = styled(IconButton)<ButtonProps>(({ theme }) => ({
		"&:hover": {
			backgroundColor: blue[600]
		}
	}));

	return (
		<Link href={props.link} underline="none">
			<SocialTooltip
				title={`${props.networkName}: ${props.userName}`}
				placement="left"
			>
				<SocialButton
					aria-label={props.networkName}
					className={styles.socialButton}
				>
					{props.iconSource === "mdi" ? (
						<Icon>{props.icon}</Icon>
					) : (
						<Icon className={props.icon}></Icon>
					)}
				</SocialButton>
			</SocialTooltip>
		</Link>
	);
}