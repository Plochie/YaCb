import React from 'react';
import { CommonItem } from './common-item';
//
export interface PanelItemProps {
	title?: string;
	data?: any;
	alwaysVisible?: boolean;
	icon?: React.ReactElement;
	children?: React.ReactNode;
	shortcut?: string[][];
	onClick?: () => number | void;
	onHover?: () => void;
	containerStyles?: React.CSSProperties;
}
//
export const PanelItem = (props: PanelItemProps) => {
	//
	return <CommonItem {...props} attr="panel-item-container"></CommonItem>;
};
