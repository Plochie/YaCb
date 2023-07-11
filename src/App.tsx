import React, { useEffect } from 'react';
import styles from './App.css';
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
//
document.addEventListener('mousemove', async (e) => {
	if (e.buttons === 1) {
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
		<div className={styles.app}>
			<CommandBar></CommandBar>
		</div>
	);
}

export default App;
