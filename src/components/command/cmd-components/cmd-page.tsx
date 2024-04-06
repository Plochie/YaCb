import { Action } from 'app-src/actions';
import { useDocumentKeyEvent } from 'app-src/components/command/hooks/useDocumentKeyEvent';
import React, { useEffect, useRef } from 'react';
import { useInputKeyChangeEvent } from 'app-src/components/command/hooks';

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

interface Store {
	itemIndex: number;
	sideItemIndex: number;
	focus: 'group' | 'panel';
}

/**
 *
 * @param props
 * @returns
 */
export const Page = (props: PageProps) => {
	//
	//
	// item index will store current selected item
	const store = useRef<Store>({
		itemIndex: 0,
		sideItemIndex: 0,
		focus: 'group',
	}).current;
	//
	const updateItems = (e?: KeyboardEvent) => {
		if (store.focus === 'group') {
			//
			const items = document.querySelectorAll(
				'[data-yacb="item-container"]'
			) as NodeListOf<HTMLDivElement>;
			const page = document.querySelector(
				'[data-yacb="page"]'
			) as HTMLDivElement;
			//
			if (e?.key === 'ArrowDown') {
				store.itemIndex =
					store.itemIndex < items.length - 1 ? store.itemIndex + 1 : 0;
			} //
			else if (e?.key === 'ArrowUp') {
				store.itemIndex =
					store.itemIndex > 0 ? store.itemIndex - 1 : items.length - 1;
			} //
			else if (e?.key === 'ArrowRight') {
				store.focus = 'panel';
				updateItems(e);
			} //
			else if (e?.key === 'Enter') {
				items[store.itemIndex].click();
			}
			//
			// console.log({ store, items, page });
			//
			items.forEach((item, index) => {
				let active = false;
				if (index === store.itemIndex) {
					active = true;
					if (store.itemIndex === 0) {
						page.scrollIntoView({
							behavior: 'auto',
							block: 'start',
						});
					} else {
						item.scrollIntoView({
							behavior: 'auto',
							block: 'nearest',
						});
					}
				}
				const stateChangeEvent = new CustomEvent('stateChange', {
					detail: { active },
				});
				item.dispatchEvent(stateChangeEvent);
			});
		}
		//
		//
		else if (store.focus === 'panel') {
			//
			const sideItems = document.querySelectorAll(
				'[data-yacb="panel"] > [data-yacb="panel-item-container"]'
				// '[data-yacb="panel"]>div'
			) as NodeListOf<HTMLDivElement>;
			//
			console.log(sideItems);
			if (e?.key === 'ArrowLeft') {
				store.focus = 'group';
				store.sideItemIndex = 0;
				updateItems(e);
			} //
			else if (e?.key === 'ArrowDown') {
				store.sideItemIndex =
					store.sideItemIndex < sideItems.length - 1
						? store.sideItemIndex + 1
						: 0;
			} //
			else if (e?.key === 'ArrowUp') {
				store.sideItemIndex =
					store.sideItemIndex > 0
						? store.sideItemIndex - 1
						: sideItems.length - 1;
			} //
			else if (e?.key === 'Enter') {
				sideItems[store.sideItemIndex].click();
			}
			//
			sideItems.forEach((sideItem, index) => {
				let active = false;
				if (store.sideItemIndex === index && store.focus !== 'group') {
					active = true;
				}
				const stateChangeEvent = new CustomEvent('stateChange', {
					detail: { active },
					bubbles: false,
					cancelable: false,
					composed: false,
				});
				sideItem.dispatchEvent(stateChangeEvent);
			});
		}
	};
	//
	useEffect(() => {
		// this is for first render to highlight first element in the items list
		updateItems();
	}, []);
	//
	//
	useDocumentKeyEvent(({ event }) => {
		updateItems(event);
	});
	//
	useInputKeyChangeEvent(() => {
		// IMPROVEMENT: might be causing some performance hit as rendering might be happening
		updateItems();
	});
	// render
	return (
		<div className="row" data-yacb="page">
			{/* <div className="col">{props.children}</div> */}
			{props.children}
			{/* Side panel will be added here using portal from item component */}
		</div>
	);
};
