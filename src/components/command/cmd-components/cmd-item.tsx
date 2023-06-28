import React from 'react';
import styles from './styles/CmdItem.module.scss';

export type ItemType = React.ReactElement<
	ItemProps,
	React.JSXElementConstructor<React.Component<typeof Item>>
>;

export type GenericItemType = React.ReactElement<
	GenericItemProps,
	React.JSXElementConstructor<React.Component<typeof GenericItem>>
>;

export interface ItemProps {
	title: string;
	data?: any;
	alwaysVisible?: boolean;
	// triggerWord?: string;
	// onTriggerWordAction?: TriggerWordAction;
	icon?: React.ReactElement;
	children?: React.ReactNode;
	shortcut?: string[];
	onClick?: () => number | void;
	onHover?: () => void;
	containerStyles?: React.CSSProperties;
}
//
export const Item = (props: ItemProps) => {
	//
	return (
		<div
			className={styles.item}
			onClick={props.onClick}
			style={props.containerStyles}
			onMouseEnter={props.onHover}
			data-yacb="item"
		>
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

interface GenericItemProps {
	children?: React.ReactNode;
	onClick?: () => void;
}

export const GenericItem = ({ children }: GenericItemProps) => {
	return <div className={styles.item}>{children}</div>;
};
