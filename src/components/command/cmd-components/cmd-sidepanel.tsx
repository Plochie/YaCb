import React from 'react';
// import { Group } from './cmd-group';
// import styles from './styles/CmdPage.module.scss';

export type PageType = React.ReactElement<
	SidePanelProps,
	React.JSXElementConstructor<React.Component<typeof SidePanel>>
>;
interface SidePanelProps {
	children?: React.ReactNode;
}

/**
 *
 * @param props
 * @returns
 */
export const SidePanel = (props: SidePanelProps) => {
	// render
	return <div style={{ textAlign: 'center' }}>{props.children}</div>;
};
