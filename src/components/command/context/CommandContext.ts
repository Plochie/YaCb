import { TriggerSuccessResultType, Action } from 'app-src/actions';
import { createContext } from 'react';

// TODO: add comments on each property to specify what it does
export interface CommandContextType {
	//
	isActionLoading: boolean;
	//
	setIsActionLoading: (isLoading: boolean) => void;
	//
	currentPage: string;
	//
	// triggerResult?: TriggerSuccessResultType;
	//
	matchedActions?: Action[];
	//
	triggerResults?: Map<string, TriggerSuccessResultType>;
}

export const CommandContext = createContext<CommandContextType>({
	isActionLoading: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setIsActionLoading: () => {},
	currentPage: 'home',
});
//
//
//

export const ItemContext = createContext<{ index: number }>({
	index: 0,
});
