import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/CmdItem.css';
import { useSetAtom } from 'jotai';
import { sidePanelAtom } from './cmd-page';

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
	sidePanel?: React.ReactElement;
	icon?: React.ReactElement;
	children?: React.ReactNode;
	shortcut?: string[][];
	onClick?: () => number | void;
	onHover?: () => void;
	containerStyles?: React.CSSProperties;
}
//
export const Item = (props: ItemProps) => {
	//
	const ref = useRef<any>();
	const [isActive, setIsActive] = useState(false);
	const setSidePanelAtom = useSetAtom(sidePanelAtom);
	//
	useEffect(() => {
		const active = ref?.current?.getAttribute('data-yacb-item-active');
		if (active && active === 'true') {
			setSidePanelAtom(props.sidePanel as any);
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [ref?.current?.getAttribute('data-yacb-item-active')]);
	//
	return (
		<div
			ref={ref}
			className={styles.itemContainer}
			onClick={props.onClick}
			style={props.containerStyles}
			onMouseEnter={props.onHover}
			data-yacb="item-container"
			data-yacb-item-index="0"
			data-yacb-item-active="false"
		>
			{/* title */}
			<div className={styles.item} data-yacb="item">
				{props.icon && <div className={styles.icon}>{props.icon}</div>}
				<div className={styles.itemChildren}>
					{props.children ? props.children : props.title}
				</div>
				{props.shortcut && (
					<div className={styles.shortcut}>
						{props.shortcut.map((w, i) => {
							return w.map((sj, j) => {
								let s = sj;
								if (sj === ' ') {
									s = 'Space';
								}
								// if (j !== w.length - 1) {
								// 	return (
								// 		<React.Fragment key={i + j}>
								// 			<kbd key={i}>{s}</kbd>
								// 			<span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
								// 				+
								// 			</span>
								// 		</React.Fragment>
								// 	);
								// } //
								// else {
								// 	return <kbd key={i + j}>{s}</kbd>;
								// }
								return <kbd key={i + j}>{s}</kbd>;
							});
						})}
					</div>
				)}
			</div>
		</div>
	);
};
//
//
interface GenericItemProps {
	children?: React.ReactNode;
	onClick?: () => void;
}
//
export const GenericItem = ({ children }: GenericItemProps) => {
	return <div className={styles.item}>{children}</div>;
};
