import React, { useEffect, useState } from 'react';
// import { Group } from './cmd-group';
import { Action } from 'app-src/actions';
import { Group } from './cmd-group';
import { SidePanel } from './cmd-sidepanel';
import styles from './styles/CmdPage.css';
import itemStyles from './styles/CmdItem.css';
import {
	DocumentKeyEvent,
	useDocumentKeyEvent,
} from 'app-src/hooks/useDocumentKeyEvent';
//
import { atom, useAtomValue } from 'jotai';
export const sidePanelAtom: any = atom(0);

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
	// item index will store current selected item
	const store = React.useRef({ itemIndex: 0 }).current;
	const sidePanel = useAtomValue(sidePanelAtom);
	//
	const updateItems = (event?: DocumentKeyEvent) => {
		//
		const items = document.querySelectorAll(
			'[data-yacb="item-container"]'
		) as NodeListOf<HTMLDivElement>;
		const page = document.querySelector('[data-yacb="page"]') as HTMLDivElement;
		if (event === 'KEY_DOWN') {
			store.itemIndex =
				store.itemIndex < items.length - 1 ? store.itemIndex + 1 : 0;
		} //
		else if (event === 'KEY_UP') {
			store.itemIndex =
				store.itemIndex > 0 ? store.itemIndex - 1 : items.length - 1;
		} //
		else if (event === 'ENTER') {
			items[store.itemIndex].click();
		}
		//
		items.forEach((itemContainer, index) => {
			itemContainer.setAttribute('data-yacb-item-index', '' + index);
			const item = itemContainer.querySelector('[data-yacb="item"]');
			if (index === store.itemIndex) {
				// itemContainer.classList.add(itemStyles.itemHover);
				item?.classList.add(itemStyles.itemHover);
				if (store.itemIndex === 0) {
					page.scrollIntoView({
						behavior: 'auto',
						block: 'start',
					});
				} else {
					itemContainer.scrollIntoView({
						behavior: 'auto',
						block: 'nearest',
					});
				}
				itemContainer.setAttribute('data-yacb-item-active', 'true');
			} else {
				// itemContainer.classList.remove(itemStyles.itemHover);
				item?.classList.remove(itemStyles.itemHover);
				itemContainer.setAttribute('data-yacb-item-active', 'false');
			}
		});
	};
	//
	useEffect(() => {
		updateItems();
	}, []);
	//
	//
	useDocumentKeyEvent(({ event }) => {
		updateItems(event);
	});
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
	// render
	return (
		<div className={styles.pageContainer} data-yacb="page">
			<div className={styles.groupsContainer}>{groups}</div>
			{/* {sidePanels && sidePanels.length > 0 && (
				<div className={styles.pageContainer}>{sidePanels}</div>
			)} */}
			{sidePanel as any}
		</div>
	);
};
