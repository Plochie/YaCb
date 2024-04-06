import { useEffect } from 'react';
//
export function useDocumentKeyEvent(
	callback: ({ event }: { event: KeyboardEvent }) => void
) {
	//
	const keyHandler = (ev: KeyboardEvent) => {
		if (/ArrowUp|ArrowDown|Enter|Escape|ArrowRight|ArrowLeft/i.test(ev.key)) {
			callback({ event: ev });
		}
	};
	//
	useEffect(() => {
		document.addEventListener('keydown', keyHandler, false);
		return () => {
			document.removeEventListener('keydown', keyHandler);
		};
	}, []);
}
