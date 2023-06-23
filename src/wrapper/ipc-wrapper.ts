/* eslint-disable no-restricted-imports */
import { isRegistered, register } from '@tauri-apps/api/globalShortcut';
import { InvokeArgs, invoke as tauriInvoke } from '@tauri-apps/api/tauri';
import { appWindow as tauriAppWindow } from '@tauri-apps/api/window';
import { writeText, readText } from '@tauri-apps/api/clipboard';

const IS_VITE_DEV = false;

type InvokeCommands =
	| 'backend_logging'
	// | 'get_indexed_files'
	| 'run_cmd'
	| 'open_resource'
	| 'get_matched_files';

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

export const appWindow = tauriAppWindow;
