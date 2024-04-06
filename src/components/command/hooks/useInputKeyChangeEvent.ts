import { subscribe, unsubscribe } from 'app-src/components/command/events';
import React, { useEffect } from 'react';

export interface UseKeyChangeEventDetail {
	currInput: string;
	keyEvent: React.KeyboardEvent<HTMLInputElement>;
}

interface UseKeyChangeEventData extends Event {
	detail: UseKeyChangeEventDetail;
}

//
export function useInputKeyChangeEvent(
	callback: (data: UseKeyChangeEventData) => void,
	deps?: React.DependencyList | undefined
) {
	if (!deps) {
		deps = [];
	}

	useEffect(() => {
		// FIXME: check if subscribe happening only once
		// subscribe('__APP__INPUT_KEY_CHANGE', callback as any);
		subscribe('__APP__INPUT_KEY_CHANGE', callback as any);
		return () => {
			// unsubscribe('__APP__INPUT_KEY_CHANGE', callback as any);
			unsubscribe('__APP__INPUT_KEY_CHANGE', callback as any);
		};
	}, deps);
}
