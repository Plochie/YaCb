export * from './cmd-body';
export * from './cmd-footer';
export * from './cmd-group';
export * from './cmd-input';
export * from './item/cmd-item';
export * from './item/cmd-generic-item';
export * from './item/cmd-panel-item';
export * from './cmd-page';
export * from './cmd-wrapper';

import { Body } from './cmd-body';
import { Footer } from './cmd-footer';
import { Group } from './cmd-group';
import { Input } from './cmd-input';
import { Item } from './item/cmd-item';
import { GenericItem } from './item/cmd-generic-item';
import { PanelItem } from './item/cmd-panel-item';
import { Page } from './cmd-page';
import { Wrapper } from './cmd-wrapper';
import { SidePanel } from './cmd-sidepanel';
//
export const runOnlyOnce = { status: true };
//
const Command = {
	name: 'Command',
	Page,
	Group,
	GenericItem,
	Item,
	Input,
	Body,
	Footer,
	Wrapper,
	SidePanel,
	PanelItem,
};

export default Command;
