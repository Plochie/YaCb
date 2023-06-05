import React, { ReactElement } from 'react';
import { Group } from './cmd-group';
import styles from './styles/CmdPage.module.scss';

export type PageType = React.ReactElement<
	PageProps,
	React.JSXElementConstructor<React.Component<typeof Page>>
>;
interface PageProps {
	id: 'home' | 'triggerResult' | 'testPage';
	title?: string;
	children: React.ReactNode;
}

/**
 *
 * @param props
 * @returns
 */
export const Page = (props: PageProps) => {
	//
	const children = React.Children.toArray(props.children ?? []).filter(
		(child: any) =>
			// condition for groups directed added below page
			child.type === Group ||
			// condition for Action wrapper groups
			child.type()?.type === Group
	);

	// render
	return <div className={styles.container}>{children}</div>;
};
