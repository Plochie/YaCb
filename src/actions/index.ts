import { ReactElement } from 'react';
import { OpenResource } from './open_resource/OpenResource';
import { RunTerminal } from './run_terminal/RunTerminal';
import { ItemProps, ItemType } from 'app-src/components/command/cmd-components';

export type TriggerResultType = {
	data: string[];
	renderResultItem?: (props: ItemProps) => ReactElement;
};

export interface TriggerWordActionParams {
	query: string;
	inputKey?: React.KeyboardEvent<HTMLInputElement>;
	setIsActionLoading: (isLoading: boolean) => void;
}

export type TriggerWordAction = (
	params: TriggerWordActionParams
) => Promise<TriggerResultType> | undefined;

export const TriggerWords = [
	{
		triggerWord: 'o ',
		action: OpenResource.triggerWordAction,
	},
];

export interface Action {
	RenderElement: () => ReactElement;
	triggerWordAction?: TriggerWordAction;
	RenderResultItem?: () => ReactElement;
}

const Actions: Action[] = [OpenResource, RunTerminal];

export default Actions;
