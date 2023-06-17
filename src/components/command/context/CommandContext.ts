import { TriggerSuccessResultType, TriggerType } from 'app-src/actions';
import { createContext } from 'react';

export interface CommandContextType {
	inputString: string;
	matchedTrigger?: TriggerType;
	inputKey?: React.KeyboardEvent<HTMLInputElement>;
	onCommandChange: (str: string) => void;
	onInputKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	isActionLoading: boolean;
	setIsActionLoading: (isLoading: boolean) => void;
	currentPage: string;
	triggerResult?: TriggerSuccessResultType;
}

export const CommandContext = createContext<CommandContextType>({
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onCommandChange: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onInputKey: () => {},
	inputString: '',
	isActionLoading: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setIsActionLoading: () => {},
	currentPage: 'home',
});
