import React from 'react';
// import { Group } from './cmd-group';
import styles from './styles/CmdPage.module.scss';
import { SidePanel } from './cmd-sidepanel';
import { TriggerType } from 'app-src/actions';
import { Group } from './cmd-group';

export type PageType = React.ReactElement<
	PageProps,
	React.JSXElementConstructor<React.Component<typeof Page>>
>;
export interface PageProps {
	id: string;
	title?: string;
	children: React.ReactNode;
	trigger?: TriggerType;
}

/**
 *
 * @param props
 * @returns
 */
export const Page = (props: PageProps) => {
	// FIXME: do following in n iteration rather than 2 iteration
	const groups = React.Children.toArray(props.children ?? []).filter(
		(child: any) =>
			// condition for groups directed added below page
			child.type === Group ||
			// condition for Action wrapper groups
			(typeof child.type === 'function' && child.type({})?.type === Group)
	);
	const sidePanel = React.Children.toArray(props.children ?? []).filter(
		(child: any) =>
			// condition for groups directed added below page
			child.type === SidePanel ||
			// condition for Action wrapper groups
			(typeof child.type === 'function' && child.type({})?.type === SidePanel)
	);

	// render
	return (
		<div className={styles['page-container']}>
			<div className={styles['groups-container']}>{groups}</div>
			<div className={styles['panel-container']}>{sidePanel}</div>
		</div>
	);
};
