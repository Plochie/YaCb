import React, { useState } from 'react';
// import { Group } from './cmd-group';
import { Action } from 'app-src/actions';
import { useKeyChangeEvent } from 'app-src/hooks';
import { SidePanel } from './cmd-sidepanel';
import styles from './styles/CmdPage.module.scss';

export type PageType = React.ReactElement<
	PageProps,
	React.JSXElementConstructor<React.Component<typeof Page>>
>;
export interface PageProps {
	id: string;
	title?: string;
	children: React.ReactNode;
	trigger?: Action;
}

//
const checkComponentTypes = (e: any, m: any) => {
	// max depth check till 4 nesting
	let element = e;
	for (let i = 0; i < 4; i++) {
		if (element.type === m) {
			return true;
		} else if (typeof element.type === 'function') {
			element = element.type({});
			continue;
		}
		break;
	}
	return false;
};

/**
 *
 * @param props
 * @returns
 */
export const Page = (props: PageProps) => {
	//
	//
	const [itemIndex, setItemIndex] = useState(0);
	//
	useKeyChangeEvent((data) => {
		if (data.detail.keyEvent.key === 'ArrowDown') {
			setItemIndex((p) => p + 1);
		}
	});
	//
	//
	// visible items
	const groups: any[] = [];
	const sidePanels: any[] = [];
	React.Children.toArray(props.children ?? []).forEach((child: any) => {
		if (checkComponentTypes(child, SidePanel)) {
			sidePanels.push(child);
		} else {
			groups.push(child);
		}
	});
	// console.log(groups);
	// render
	return (
		<div className={styles['page-container']}>
			{/* <div style={{ padding: '10px' }}>{itemIndex}</div> */}
			<div className={styles['groups-container']}>
				{/* {groups.map((g: any, i: number) => {
					return <Group {...g.props} itemIndex={itemIndex} key={i} />;
				})} */}
				{groups}
			</div>
			{sidePanels && sidePanels.length > 0 && (
				<div className={styles['panel-container']}>{sidePanels}</div>
			)}
		</div>
	);
};
