import React from 'react';
import { ItemType } from './item/cmd-item';

export type PageType = React.ReactElement<
	SidePanelProps,
	React.JSXElementConstructor<React.Component<typeof SidePanel>>
>;
interface SidePanelProps {
	visible?: boolean;
	children?: ItemType[] | ItemType;
	flex?: number;
}

/**
 *
 * @param props
 * @returns
 */
export const SidePanel = (props: SidePanelProps) => {
	// render
	return props.visible ? (
		<div
			className="col"
			style={{ overflowY: 'auto', flex: props.flex ?? 0.9 }}
			data-yacb="panel"
		>
			{props.children}
		</div>
	) : (
		<></>
	);
};
