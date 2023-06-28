import React, { useEffect } from 'react';
import './App.scss';
import { CommandBar } from './components';
import {
	appWindow,
	invoke,
	isShortcutRegistered,
	registerShortcut,
} from './wrapper/ipc-wrapper';
//
//
// eslint-disable-next-line no-restricted-imports
import { window as tauriWindow } from '@tauri-apps/api';
// ...
let dragging = false;
const noDragSelector = 'input, a, button';
document.addEventListener('mouseup', async (e) => {
	dragging = false;
});
document.addEventListener('mousedown', async (e) => {
	dragging = true;
});
document.addEventListener('mousemove', async (e) => {
	if (dragging) {
		// if (e.target?.closest(noDragSelector)) return; // a non-draggable element either in target or its ancestors
		await tauriWindow.appWindow.startDragging();
	}
});
//
//
function App() {
	const [isOpen, setIsOpen] = React.useState(true);

	useEffect(() => {
		(async () => {
			if (!(await isShortcutRegistered('F15'))) {
				await registerShortcut('F15', () => {
					console.log('Shortcut triggered from fe');
					// setIsOpen((s) => !s);
				});
			}
		})();
	});

	//
	useEffect(() => {
		(async (o) => {
			if (o) {
				await appWindow.show();
				await invoke('backend_logging', { msg: 'window should be open' });
			} //
			else {
				await appWindow.hide();
				await invoke('backend_logging', { msg: 'window should be hidden' });
			}
		})(isOpen);
	}, [isOpen]);

	// return <CommandBar isOpen={isOpen} onOpenChange={setIsOpen} />;
	return (
		<div className="app">
			<CommandBar></CommandBar>
		</div>
	);
}

export default App;
