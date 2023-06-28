export * from './cmd-body';
export * from './cmd-empty';
export * from './cmd-footer';
export * from './cmd-group';
export * from './cmd-input';
export * from './cmd-item';
export * from './cmd-page';
export * from './cmd-wrapper';

import { Body } from './cmd-body';
import { Empty } from './cmd-empty';
import { Footer } from './cmd-footer';
import { Group } from './cmd-group';
import { Input } from './cmd-input';
import { Item, GenericItem } from './cmd-item';
import { Notify } from './cmd-notify';
import { Page } from './cmd-page';
import { Wrapper } from './cmd-wrapper';
import { SidePanel } from './cmd-sidepanel';
//
export const runOnlyOnce = { status: true };
//
const Command = {
	Page,
	Group,
	GenericItem,
	Item,
	Input,
	Body,
	Empty,
	Footer,
	Wrapper,
	Notify,
	SidePanel,
};

export default Command;
