/* eslint-disable no-restricted-imports */
import { isRegistered, register } from '@tauri-apps/api/globalShortcut';
import { InvokeArgs, invoke as tauriInvoke } from '@tauri-apps/api/tauri';
import {
	WebviewWindow,
	appWindow as tauriAppWindow,
} from '@tauri-apps/api/window';
import { writeText, readText } from '@tauri-apps/api/clipboard';

const IS_VITE_DEV = false;

type InvokeCommands =
	| 'backend_logging'
	// | 'get_indexed_files'
	| 'run_cmd'
	| 'open_file'
	| 'open_containing_folder'
	| 'get_matched_files'
	| 'color_picker'
	| 'mouse_location'
	| 'start_input_event';

/**
 *
 * @param cmd
 * @param args
 * @returns
 */
export const invoke = <T>(
	cmd: InvokeCommands,
	args?: InvokeArgs
): Promise<T> => {
	if (IS_VITE_DEV) {
		return Promise.resolve() as any;
	}
	return tauriInvoke(cmd, args);
};

/**
 *
 * @param shortcut
 * @returns
 */
export const isShortcutRegistered = (shortcut: string): Promise<boolean> => {
	if (IS_VITE_DEV) {
		return Promise.resolve() as any;
	}
	return isRegistered(shortcut);
};

/**
 *
 * @param shortcut
 * @param handler
 * @returns
 */
export const registerShortcut = (
	shortcut: string,
	handler: (shortcut: string) => void
) => {
	if (IS_VITE_DEV) {
		return Promise.resolve() as any;
	}
	return register(shortcut, handler);
};

export const writeToClipboard = async (text: string) => {
	await writeText(text);
};

/**
 *
 * @param windowUrl
 * @returns
 */
export const openWindow = (
	windowUrl: string,
	uniqueId: string,
	width: number,
	height: number
) => {
	// console.log('setting window');
	const webview = new WebviewWindow(uniqueId, {
		url: windowUrl,
		width,
		height,
		alwaysOnTop: true,
		decorations: false,
	});
	//
	return new Promise((resolve, reject) => {
		webview.once('tauri://created', function () {
			resolve(true);
		});
		webview.once('tauri://error', function (e) {
			reject(e);
		});
	});
};

export const appWindow = tauriAppWindow;
