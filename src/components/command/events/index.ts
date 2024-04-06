import { UseKeyChangeEventDetail } from 'app-src/components/command/hooks';
//
type EventName = '__APP__INPUT_STRING_CHANGE' | '__APP__INPUT_KEY_CHANGE';

let prevPublishKeyChangeEvent: UseKeyChangeEventDetail | undefined;
//
export const subscribe = (
	event: EventName,
	listener: EventListenerOrEventListenerObject
) => {
	document.addEventListener(event, listener, {
		passive: true,
		capture: true,
	});
};

export const unsubscribe = (
	event: EventName,
	listener: EventListenerOrEventListenerObject
) => {
	document.removeEventListener(event, listener);
};

export const publish = (event: EventName, data: any) => {
	const e = new CustomEvent(event, { detail: data });
	document.dispatchEvent(e);
};
//
//

export const publishKeyChangeEvent = (data: UseKeyChangeEventDetail) => {
	if (data.keyEvent.ctrlKey || data.keyEvent.shiftKey || data.keyEvent.altKey) {
		return;
	}
	prevPublishKeyChangeEvent = data;
	publish('__APP__INPUT_KEY_CHANGE', data);
};

// export const lastPublishedKeyChangeEvent = ():
// 	| UseKeyChangeEventDetail
// 	| undefined => {
// 	console.debug(
// 		'🪢 lastPublishedKeyChangeEvent called',
// 		prevPublishKeyChangeEvent
// 	);
// 	// return prevPublishKeyChangeEvent;
// };

export const clearLastPublishedKeyChangeEvent = () => {
	console.debug('🧹 lastPublishedKeyChangeEvent cleared');
	prevPublishKeyChangeEvent = undefined;
};
