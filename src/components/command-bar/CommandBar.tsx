import { Actions } from 'app-src/actions';
import { Command } from '@yacb-core-lib';
import { WebviewWindow } from '@tauri-apps/api/window';
//
//

// () => {
// console.log('setting window');
// const webview = new WebviewWindow('theUniqueLabel', {
// 	url: '/about',
// });
// webview.once('tauri://created', function () {
// 	// webview window successfully created
// 	console.log('setting window opened');
// });
// webview.once('tauri://error', function (e) {
// 	// an error occurred during webview window creation
// 	console.log(e);
// });
// }
export const CommandBar = () => {
	//
	const onSettingClick = () => {
		console.log('setting window');
		const webview = new WebviewWindow('settings_window', {
			url: '/settings_window',
		});
		webview.once('tauri://created', function () {
			// webview window successfully created
			console.log('setting window opened');
		});
		webview.once('tauri://error', function (e) {
			// an error occurred during webview window creation
			console.log(e);
		});
	};

	//
	return (
		<Command.Wrapper>
			<Command.Input onSettingClick={onSettingClick} />
			<Command.Body>
				{/* <Command.Page id="home" title="home">
				</Command.Page> */}
				<Command.Page id="result" title="result">
					{/* <ColorPickerAction /> */}
					{/* <OpenResourceAction /> */}
					{/* <MathEvalAction /> */}
					{/* <WledAction /> */}
					{/* <TodoAction /> */}
					{Actions.map((Action, index) => (
						<Action key={index} />
					))}
					{/* <Button></Button> */}
				</Command.Page>
			</Command.Body>
		</Command.Wrapper>
	);
};
