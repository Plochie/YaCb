import { ItemProps } from 'app-src/components/command/cmd-components';
import { ReactElement } from 'react';
import { MathEvalAction } from './mathematics/MathAction';
import { OpenResource } from './open_resource/OpenResource';

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
	inputKey?: React.KeyboardEvent<HTMLInputElement>;
	setIsActionLoading: (isLoading: boolean) => void;
}

export type TriggerWordAction = (
	params: TriggerWordActionParams
) => Promise<TriggerResultType>;

export interface Action {
	pageId: string;
	resultPage: () => ReactElement;
}

export interface TriggerType {
	word: string;
	action: TriggerWordAction | undefined;
	pageId: string;
}

//
type TriggerWords = { [key: string]: TriggerType };
export const triggerWords: TriggerWords = {};
//
const Actions: Action[] = [
	OpenResource,
	MathEvalAction,
	// RunTerminal,
	// ColorPicker,
	// SettingsAction,
];

export default Actions;
