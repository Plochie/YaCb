import { ItemProps } from 'app-src/components/command/cmd-components';
import { ReactElement } from 'react';
import { MathEvalAction } from './mathematics/MathAction';
import { OpenResource } from './open_resource/OpenResource';
import { ColorPickerAction } from './color_picker/ColorPicker';
import { nanoid } from 'nanoid';
import { SettingsActions } from './settings/SettingsActions';

export type TriggerIgnoreResultType = {
	caller: string;
	msg: string;
};

export type TriggerSuccessResultItem = {
	title: string;
	data?: any;
	renderResultItem?: (props: ItemProps) => ReactElement;
};

export type TriggerSuccessResultType = {
	groupTitle?: string;
	items: TriggerSuccessResultItem[];
	renderResultItem?: (props: ItemProps) => ReactElement;
	renderResultPanel?: (props: ItemProps) => ReactElement;
};

export type TriggerResultType = {
	success?: TriggerSuccessResultType;
	ignore?: TriggerIgnoreResultType;
};

export interface TriggerWordActionParams {
	query: string;
	keyEvent?: React.KeyboardEvent<HTMLInputElement>;
	setIsActionLoading: (isLoading: boolean) => void;
}

export type TriggerWordAction = (
	params: TriggerWordActionParams
) => Promise<TriggerResultType>;

export interface UserAction {
	resultGroup: () => React.ReactNode;
	word: string;
	action: TriggerWordAction;
	invokeActionOnModifier?: boolean;
	priority?: number;
}

export interface ResultGroup {
	(): JSX.Element;
	_groupId: string;
}

export interface Action extends UserAction {
	// NOTE: group id will be added by program at run time using nano id
	_groupId: string;
	resultGroup: ResultGroup;
	// this will actually get used and not priority
	_priority: number;
}

// export interface TriggerType {
// 	word: string;
// 	action: TriggerWordAction | undefined;
// 	pageId: string;
// }

//
// type TriggerWords = { [key: string]: TriggerType };
// export const triggerWords: TriggerType[] = [];
//
const Actions: Action[] = [
	OpenResource,
	MathEvalAction,
	// RunTerminal,
	ColorPickerAction,
	SettingsActions,
]
	// assign unique id to each action
	.map((action) => {
		const a = action as Action;
		a._groupId = nanoid();
		a.resultGroup._groupId = a._groupId;
		if (a.invokeActionOnModifier === undefined) {
			a.invokeActionOnModifier = false;
		}
		a._priority = -1;
		if (a.priority !== undefined) {
			a._priority = a.priority;
		}
		return a;
	})
	// sort actions by comparing trigger word
	.sort((a, b) => b.word.localeCompare(a.word));

export default Actions;
