import { Action, TriggerSuccessResultType } from 'app-src/actions';
import React, { createContext } from 'react';

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
	//
	sidePanel?: React.ReactElement;
	setSidePanel?: any;
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
