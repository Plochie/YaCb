import React from 'react';
// import { Group } from './cmd-group';
import { Action } from 'app-src/actions';
import { Group } from './cmd-group';
import { SidePanel } from './cmd-sidepanel';
import styles from './styles/CmdPage.css';
import itemStyles from './styles/CmdItem.css';
import { useDocumentKeyEvent } from 'app-src/hooks/useDocumentKeyEvent';

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
	// item index will store current selected item
	const store = React.useRef({ itemIndex: 0 }).current;
	//
	useDocumentKeyEvent(({ event }) => {
		const items = document.querySelectorAll(
			'[data-yacb="item"]'
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
		items.forEach((item, index) => {
			item.setAttribute('data-yacb-item-index', '' + index);
			if (index === store.itemIndex) {
				item.classList.add(itemStyles.itemHover);
				if (store.itemIndex === 0) {
					page.scrollTop = 0;
				} else {
					item.scrollIntoView({
						behavior: 'auto',
						block: 'nearest',
					});
				}
				item.setAttribute('data-yacb-item-active', 'true');
			} else {
				item.classList.remove(itemStyles.itemHover);
				item.setAttribute('data-yacb-item-active', 'false');
			}
		});
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
			{sidePanels && sidePanels.length > 0 && (
				<div className={styles.pageContainer}>{sidePanels}</div>
			)}
		</div>
	);
};
