import { CommandContext } from 'app-components/command/context';
import { Action } from 'app-src/actions';
import { UseKeyChangeEventDetail } from 'app-src/hooks';
import React, { ReactNode, useContext, useRef, useState } from 'react';
import { GenericItem, ItemType } from './cmd-item';
import styles from './styles/CmdGroup.css';

export type GroupType = React.ReactElement<
	GroupProps,
	React.JSXElementConstructor<React.Component<typeof Group>>
>;

const visibleItems = (
	inputString: string,
	matchedActions: Action[] | undefined,
	itemNodes: React.ReactNode[] | undefined
): React.ReactNode[] => {
	//
	if (inputString === undefined || inputString.length === 0) {
		return itemNodes ?? [];
	}
	//
	const items = (itemNodes ?? []) as ItemType[];
	let searchedItems: ItemType[] = [];

	matchedActions?.forEach((actions) => {
		const query = inputString.substring(actions.word.length);
		const matched = items.filter((i) => {
			// searching in title of Item

			if (i.props?.title?.toLowerCase().includes(query)) {
				return true;
			} //
			if (i.type === GenericItem) {
				return true;
			}
			return false;
		});
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
	// TODO: should use fuzzy search here?
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
	const [keyChangeData, setKeyChangeData] = useState<UseKeyChangeEventDetail>();
	//
	const store = useRef({ subscribed: false });
	//
	// useInputKeyChangeEvent((data) => {
	// 	setKeyChangeData(data.detail);
	// });
	//
	/**
	 * IMPROVEMENT: is there a better way to handle?
	 */
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
	// else {
	// TODO: is last published event required?
	// 	const ev = lastPublishedKeyChangeEvent();
	// 	if (ev) {
	// 		visibleChildren = visibleItems(
	// 			ev.currInput,
	// 			commandContext.matchedActions,
	// 			React.Children.toArray(props.children ?? [])
	// 		);
	// 	}
	// }
	//
	//
	return visibleChildren.length > 0 ? (
		<div className={styles.groupContainer} data-yacb="group">
			{props.title && props.title.trim() !== '' && (
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
