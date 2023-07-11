import React from 'react';
import styles from '../CommandBar.css';
interface WrapperProps {
	children: React.ReactNode;
	theme: string;
}

export const Wrapper = (props: WrapperProps) => {
	// render
	return (
		<div
			className={`${props.theme} ${styles.commandBarContainer} command-bar-container`}
		>
			{props.children}
		</div>
	);
};
