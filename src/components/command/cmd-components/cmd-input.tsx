import { Loader } from 'app-src/components/loader/Loader';
import { publishKeyChangeEvent } from 'app-src/components/command/events';
import { useRef } from 'react';
import { LuSearch, LuSettings } from 'react-icons/lu';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { useCommandStore } from 'app-src/components/command/store';
import styles from 'app-src/components/command/cmd-components/styles/CmdInput.css';
// import { WebviewWindow } from '@tauri-apps/api/window';

//
//
export const Input = () => {
	//
	const store = useRef({ inputStr: '' }).current;
	const _isLoading = useCommandStore((s) => s.isLoading);
	const _setCurrentInput = useCommandStore((s) => s.setCurrentInput);
	//
	return (
		<div className={styles.inputContainer}>
			<div className={styles.input}>
				<input
					// className={styles.input}
					autoFocus
					onKeyUp={(keyEvent) => {
						// e.preventDefault();
						keyEvent.stopPropagation();
						const currInput = (keyEvent.target as any).value as string;
						// only publish if input string changes, for modifiers or arrows keys this wont publish event
						if (store.inputStr !== currInput) {
							publishKeyChangeEvent({ currInput, keyEvent });
							_setCurrentInput(currInput);
						}
						//
						store.inputStr = currInput;
					}}
					onKeyDown={(e) => {
						// ignore events for arrow up and down as these will be used in
						// global document key event handler hook
						if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
							e.preventDefault();
						} else if (e.key === 'Escape') {
							e.preventDefault();
							(e.target as any).value = '';
						}
					}}
				></input>
				<div className={styles.rightContainer}>
					{_isLoading ? (
						<Loader isLoading={_isLoading} />
					) : (
						<LuSearch className={styles.icon} />
					)}
					{/* setting icon */}
					<LuSettings
						className={styles.icon}
						onClick={() => {
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
						}}
					/>
					{/* drag region */}
					<PiDotsSixVerticalBold
						className={styles.icon}
						style={{ cursor: 'move' }}
						data-tauri-drag-region
					/>
				</div>
			</div>
		</div>
	);
};
