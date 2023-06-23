import { CommandContext } from 'app-components/command/context';
import { Action } from 'app-src/actions';
import { lastPublishedKeyChangeEvent } from 'app-src/events';
import { UseKeyChangeEventDetail, useKeyChangeEvent } from 'app-src/hooks';
import MiniSearch from 'minisearch';
import React, { ReactNode, useContext, useState } from 'react';
import { ItemType } from './cmd-item';
import styles from './styles/CmdGroup.module.scss';

const miniSearch = new MiniSearch({
	fields: ['title'], // fields to index for full-text search
	storeFields: ['title', 'item'], // fields to return with search results
});

export type GroupType = React.ReactElement<
	GroupProps,
	React.JSXElementConstructor<React.Component<typeof Group>>
>;

const visibleItems = (
	inputString: string,
	matchedActions: Set<Action> | undefined,
	itemNodes: React.ReactNode[] | undefined
): React.ReactNode[] => {
	//
	miniSearch.removeAll();
	//
	if (inputString === undefined || inputString.length === 0) {
		return itemNodes ?? [];
	}
	//
	const items = (itemNodes ?? []) as ItemType[];
	// miniSearch.addAll(
	// 	items.map((item, id) => ({ id, title: item.props.title, item }))
	// );
	// match items for all matching actions

	// const query = inputString.substring(
	// 	matchedTrigger ? matchedTrigger.word.length : 0
	// );
	let searchedItems: ItemType[] = [];

	matchedActions?.forEach((actions) => {
		const query = inputString.substring(actions.word.length);
		const matched = items.filter((i) =>
			i.props?.title?.toLowerCase().includes(query)
		);
		searchedItems = [...searchedItems, ...matched];
	});
	// get elements which should be always visible, irrespective of title string
	// IMPROVEMENT: better way to get alwaysVisible
	const alwaysVisibleItems =
		items.filter(
			(i: any) =>
				i.props.alwaysVisible ||
				(i.type &&
					typeof i.type === 'function' &&
					i.type({ title: '', data: {} }).props.alwaysVisible)
		) ?? [];

	// IMPROVEMENT: Is set really required here?
	const set = new Set<ReactNode>();
	alwaysVisibleItems.forEach((i) => set.add(i));
	searchedItems.forEach((i) => set.add(i));
	// preference to trigger words
	// const triggerWordItems = items.filter(
	// 	(i) => i.props.triggerWord && inputString.startsWith(i.props.triggerWord)
	// );
	// if (triggerWordItems.length > 0) {
	// 	return triggerWordItems;
	// }

	// TODO: should use fuzzy search here?
	// return alwaysVisibleItems.concat(
	// 	miniSearch.search(pattern, { prefix: true,  }).map((o) => o.item)
	// );
	// return alwaysVisibleItems.concat(searchedItems);
	return Array.from(set);
};

interface GroupProps {
	title?: string;
	children?: React.ReactNode[] | React.ReactNode;
	itemIndex?: number;
}

/**
 *
 * @param props
 * @returns
 */
export const Group = (props: GroupProps) => {
	//
	const commandContext = useContext(CommandContext);
	// const [visibleChildren, setVisibleChildren] = useState<React.ReactNode[]>([]);
	const [keyChangeData, setKeyChangeData] = useState<UseKeyChangeEventDetail>();
	//
	useKeyChangeEvent((data) => {
		setKeyChangeData(data.detail);
		// console.log({ data });
	});
	//
	/**
	 * IMPROVEMENT: is there a better way to handle?
	 */
	// let visibleChildren: React.ReactNode[] = visibleItems(
	// 	// FIXME: blank string is mistake
	// 	'',
	// 	commandContext.matchedTrigger,
	// 	React.Children.toArray(props.children ?? [])
	// );
	let visibleChildren: React.ReactNode[] = React.Children.toArray(
		props.children
	);

	if (keyChangeData) {
		visibleChildren = visibleItems(
			keyChangeData?.currInput,
			commandContext.matchedActions,
			React.Children.toArray(props.children ?? [])
		);
	} //
	else {
		const ev = lastPublishedKeyChangeEvent();
		if (ev) {
			visibleChildren = visibleItems(
				ev.currInput,
				commandContext.matchedActions,
				React.Children.toArray(props.children ?? [])
			);
		}
	}
	//
	//
	return (
		<div className={styles['group-container']}>
			{props.title && props.title.trim() !== '' && (
				<div className={styles.title}>
					<span>{props.title}</span>
				</div>
			)}
			{visibleChildren}
		</div>
	);
};
