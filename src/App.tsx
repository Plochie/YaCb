import React, { useEffect } from 'react';
import './App.scss';
import { CommandBar } from './components';
import {
	appWindow,
	invoke,
	isShortcutRegistered,
	registerShortcut,
} from './wrapper/ipc-wrapper';

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
		<div className="app" data-tauri-drag-region>
			<CommandBar></CommandBar>
		</div>
	);
}

export default App;
