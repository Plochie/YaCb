import { TriggerWordAction } from 'app-src/actions';
import React from 'react';
import styles from './styles/CmdItem.module.scss';

export type ItemType = React.ReactElement<
	ItemProps,
	React.JSXElementConstructor<React.Component<typeof Item>>
>;

export interface ItemProps {
	title: string;
	triggerWord?: string;
	onTriggerWordAction?: TriggerWordAction;
	icon?: React.ReactElement;
	children?: React.ReactNode;
	shortcut?: string[];
	onClick?: () => number;
}
//
export const Item = (props: ItemProps) => {
	//
	return (
		<div className={styles.item} onClick={props.onClick}>
			{props.icon && <div className={styles.icon}>{props.icon}</div>}
			<div className={styles['item-children']}>
				{props.children ? props.children : props.title}
			</div>
			{props.shortcut && (
				<div className={styles.shortcut}>
					{props.shortcut.map((s, i) => (
						<kbd key={i}>{s}</kbd>
					))}
				</div>
			)}
		</div>
	);
};
