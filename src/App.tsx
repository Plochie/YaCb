import {
	appWindow,
	invoke,
	isShortcutRegistered,
	registerShortcut,
} from '@yacb-core-lib/io';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CommandBar } from './components';
import { SettingWindow } from './windows';
//
//
function App() {
	const [isOpen, setIsOpen] = React.useState(true);

	useEffect(() => {
		(async () => {
			if (!(await isShortcutRegistered('F15'))) {
				await registerShortcut('F15', async () => {
					// console.log('Shortcut triggered from fe');
					setIsOpen((s) => !s);
					await appWindow.setFocus();
				});
			}
		})();
	});

	//
	useEffect(() => {
		(async (o) => {
			if (o) {
				await appWindow.show();
				await appWindow.setFocus();
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
					path="/home_window"
					element={
						<div className="app">
							<CommandBar />
						</div>
					}
				></Route>
				<Route path="/settings_window" element={<SettingWindow />} />
				{/* <Route path="/color_picker_window" element={<ColorPickerWindow />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
