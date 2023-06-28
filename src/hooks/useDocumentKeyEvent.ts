import { useEffect } from 'react';

type DocumentKeyEvent = 'KEY_UP' | 'KEY_DOWN' | 'ENTER' | undefined;
//
//
export function useDocumentKeyEvent(
	callback: ({ event }: { event: DocumentKeyEvent }) => void
) {
	//
	//
	const keyHandler = (ev: KeyboardEvent) => {
		let keyEvent: DocumentKeyEvent;
		if (ev.key === 'ArrowUp') {
			keyEvent = 'KEY_UP';
		} else if (ev.key === 'ArrowDown') {
			keyEvent = 'KEY_DOWN';
		} else if (ev.key === 'Enter') {
			keyEvent = 'ENTER';
		}
		callback({ event: keyEvent });
	};
	//
	//
	useEffect(() => {
		document.addEventListener('keydown', keyHandler);

		return () => {
			document.removeEventListener('keydown', keyHandler);
		};
	}, []);
}
