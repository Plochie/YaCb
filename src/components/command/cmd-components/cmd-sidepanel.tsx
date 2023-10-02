import React from 'react';
import { ItemType } from './cmd-item';
// import { Group } from './cmd-group';
import styles from './styles/CmdSidePanel.css';

export type PageType = React.ReactElement<
	SidePanelProps,
	React.JSXElementConstructor<React.Component<typeof SidePanel>>
>;
interface SidePanelProps {
	children?: ItemType[];
}

/**
 *
 * @param props
 * @returns
 */
export const SidePanel = (props: SidePanelProps) => {
	// render
	return <div className={styles.sidePanel}>{props.children}</div>;
};
