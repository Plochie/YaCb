import { create } from 'zustand';

export interface UseKeyChangeEventDetail {
	currInput: string;
	keyEvent: React.KeyboardEvent<HTMLInputElement>;
}

interface CommandStore {
	isLoading: boolean;
	setIsLoading: (v: boolean) => void;
	//
	keyChange?: UseKeyChangeEventDetail;
	setKeyChange: (v: UseKeyChangeEventDetail) => void;
	//
	currInput: string;
	setCurrentInput: (v: string) => void;
	//
	onKeyChange: (v: (callback: any) => void) => void;
	onKeyChangeCallback: (callback: any) => void;
}

export const useCommandStore = create<CommandStore>((set) => ({
	isLoading: false,
	setIsLoading: (v) => set({ isLoading: v }),
	//
	setKeyChange: (v) => set({ keyChange: v }),
	//
	currInput: '',
	setCurrentInput: (v) => set({ currInput: v }),
	//
	onKeyChange: (v) => set({ onKeyChangeCallback: v }),
	onKeyChangeCallback: () => {
		console.log('1');
	},
}));
