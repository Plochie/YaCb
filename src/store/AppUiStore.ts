import { create } from 'zustand';

// TODO: add comments on each property to specify what it does
export interface CommandContextType {
	//
	inputString: string;
	setInputString: (v: string) => void;
}

// export const CommandContext = createContext<CommandContextType>({
// 	// eslint-disable-next-line @typescript-eslint/no-empty-function
// 	onCommandChange: () => {},
// 	// eslint-disable-next-line @typescript-eslint/no-empty-function
// 	onInputKey: () => {},
// 	inputString: '',
// 	isActionLoading: false,
// 	// eslint-disable-next-line @typescript-eslint/no-empty-function
// 	setIsActionLoading: () => {},
// 	currentPage: 'home',
// 	currentItemIndex: 0,
// });

export const appUiState = create<CommandContextType>((set) => ({
	inputString: '',
	setInputString: (v) => set({ inputString: v }),
}));
