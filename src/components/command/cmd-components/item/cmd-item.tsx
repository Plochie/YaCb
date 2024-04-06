import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Command from '..';
import { SidePanel } from '../cmd-sidepanel';
import { CommonItem } from './common-item';

export type ItemType = React.ReactElement<
	ItemProps,
	React.JSXElementConstructor<React.Component<typeof Item>>
>;

export interface ItemProps {
	title?: string;
	data?: any;
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
	const [isActive, setIsActive] = useState(false);
	const [sidePanel, setSidePanel] = useState<ReactNode>();
	const [childrenWOPanel, setChildrenWOPanel] = useState<ReactNode>();
	//
	//
	/**
	 * get side panels
	 */
	useEffect(() => {
		if (isActive) {
			const sidePanel = React.Children.toArray(props.children).filter(
				(c: any) => c.type === SidePanel
			);
			if (sidePanel && sidePanel.length > 0) {
				if (sidePanel.length === 1) {
					setSidePanel(sidePanel[0]);
				} else {
					// throw error to user if user has added multiple option panels
					throw Error(
						`Multiple Panels are not allowed inside ${Command.name}.${Command.Item.name} component`
					);
				}
			} //
		}
		// for inactive item remove earlier sidepanel if any
		else {
			setSidePanel(undefined);
		}
		//

		const nonSidePanel = React.Children.toArray(props.children).filter(
			(c: any) => c.type !== SidePanel
		);
		setChildrenWOPanel(nonSidePanel);
	}, [isActive, props.children]);
	//
	return (
		<CommonItem
			onIsActiveChange={(v) => setIsActive(v)}
			{...props}
			attr="item-container"
		>
			{/* side panel portal */}
			{sidePanel &&
				document.querySelector('[data-yacb="page"]') &&
				createPortal(
					<>{sidePanel}</>,
					document.querySelector('[data-yacb="page"]') as HTMLDivElement
				)}
			{childrenWOPanel}
		</CommonItem>
	);
};
