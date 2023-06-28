import React, { useState, useEffect } from 'react';
// import { Group } from './cmd-group';
import { Action } from 'app-src/actions';
import { useInputKeyChangeEvent } from 'app-src/hooks';
import { SidePanel } from './cmd-sidepanel';
import styles from './styles/CmdPage.module.scss';
import { Group } from './cmd-group';
import { ItemContext } from '../context';

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
	// const [itemIndex, setItemIndex] = useState(0);
	// //
	// useInputKeyChangeEvent((data) => {
	// 	const keyEvent = data.detail.keyEvent;
	// 	//
	// 	if (keyEvent.key === 'ArrowDown') {
	// 		setItemIndex((c) => c + 1);
	// 	}
	// 	if (keyEvent.key === 'ArrowUp') {
	// 		setItemIndex((c) => (c > 0 ? c - 1 : 0));
	// 	}
	// });
	// //
	// //
	// useEffect(() => {
	// 	const items = document.querySelectorAll('[data-yacb="item"]');

	// 	items.forEach((item, index) => {
	// 		item.setAttribute('data-yacb-item-index', '' + index);
	// 		if (index === itemIndex) {
	// 			item.classList.add('myclass');
	// 			item.scrollIntoView({
	// 				behavior: 'smooth',
	// 				block: 'end',
	// 			});
	// 		} else {
	// 			item.classList.remove('myclass');
	// 		}
	// 	});
	// }, [itemIndex]);
	//
	//
	// visible items
	const groups: any[] = [];
	const sidePanels: any[] = [];
	React.Children.toArray(props.children ?? []).forEach((child: any) => {
		if (checkComponentTypes(child, SidePanel)) {
			sidePanels.push(child);
		} else {
			checkComponentTypes(child, Group);
			groups.push(child);
		}
	});
	// console.log(`☄️: ${}`, groups);
	// render
	return (
		<div className={styles['page-container']} data-yacb="page">
			<div className={styles['groups-container']}>
				{/* {groups.map((g: any, i: number) => {
					return (
						<Group {...g.props} itemIndex={itemIndex} key={i}>
							{g.props.children}
						</Group>
					);
					// console.log(g);
					// return g;
				})} */}
				{groups}
			</div>
			{sidePanels && sidePanels.length > 0 && (
				<div className={styles['panel-container']}>{sidePanels}</div>
			)}
		</div>
	);
};
