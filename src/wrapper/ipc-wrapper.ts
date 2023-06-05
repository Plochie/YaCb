/* eslint-disable no-restricted-imports */
import { invoke as tauriInvoke, InvokeArgs } from '@tauri-apps/api/tauri';
import { isRegistered, register } from '@tauri-apps/api/globalShortcut';
import { appWindow as tauriAppWindow } from '@tauri-apps/api/window';

const IS_VITE_DEV = false;

type InvokeCommands =
	| 'backend_logging'
	| 'get_indexed_files'
	| 'run_cmd'
	| 'open_resource';

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

export const appWindow = tauriAppWindow;
