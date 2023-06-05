import { CommandContext } from 'app-components/command/CommandBar';
import React, { useContext, useEffect, useState } from 'react';
import { Item, ItemType } from './cmd-item';
import styles from './styles/CmdGroup.module.scss';
import MiniSearch from 'minisearch';

const miniSearch = new MiniSearch({
	fields: ['title'], // fields to index for full-text search
	storeFields: ['title', 'item'], // fields to return with search results
});

export type GroupType = React.ReactElement<
	GroupProps,
	React.JSXElementConstructor<React.Component<typeof Group>>
>;

const visibleItems = (
	patternOrg: string,
	itemNodes: React.ReactNode[]
): React.ReactNode[] => {
	//
	miniSearch.removeAll();
	//
	const pattern = patternOrg.toLowerCase();
	if (patternOrg === undefined || patternOrg.length === 0) {
		return itemNodes;
	}
	//
	const items = itemNodes as ItemType[];
	miniSearch.addAll(
		items.map((item, id) => ({ id, title: item.props.title, item }))
	);
	// preference to trigger words
	const triggerWordItems = items.filter(
		(i) => i.props.triggerWord && patternOrg.startsWith(i.props.triggerWord)
	);
	if (triggerWordItems.length > 0) {
		return triggerWordItems;
	}
	return miniSearch.search(pattern).map((o) => o.item);
};

interface GroupProps {
	title?: string;
	children?: React.ReactNode;
}

/**
 *
 * @param props
 * @returns
 */
export const Group = (props: GroupProps) => {
	//
	const commandContext = useContext(CommandContext);
	//
	const visibleChildren = visibleItems(
		commandContext.pattern,
		React.Children.toArray(props.children ?? [])
	);
	//
	return visibleChildren.length !== 0 ? (
		<div className={styles['group-container']}>
			{props.title && (
				<div className={styles.title}>
					<span>{props.title}</span>
				</div>
			)}
			{visibleChildren}
		</div>
	) : (
		<></>
	);
};
