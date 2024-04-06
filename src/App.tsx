import React, { useEffect } from 'react';
import styles from './App.css';
import { CommandBar } from './components';
import {
	appWindow,
	invoke,
	isShortcutRegistered,
	registerShortcut,
} from './wrapper/ipc-wrapper';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
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
		<BrowserRouter>
			<Routes>
				<Route
					path="/home"
					element={
						<div className={styles.app}>
							<CommandBar />
						</div>
					}
				></Route>
				<Route path="/settings">{/* <About /> */}</Route>
			</Routes>
		</BrowserRouter>
		// <div className={styles.app}>
		// 	<CommandBar></CommandBar>
		// </div>
	);
}

export default App;
