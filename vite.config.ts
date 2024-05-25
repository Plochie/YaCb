import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	plugins: [react(), nodePolyfills()],

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	// prevent vite from obscuring rust errors
	clearScreen: false,
	// tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
	},
	// to make use of `TAURI_DEBUG` and other env variables
	// https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
	envPrefix: ['VITE_', 'TAURI_'],
	build: {
		// Tauri supports es2021
		target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
		// don't minify for debug builds
		minify: (!process.env.TAURI_DEBUG ? 'esbuild' : false) as boolean,
		// produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_DEBUG,
	},
	resolve: {
		alias: [
			{ find: 'app-src', replacement: path.resolve(__dirname, 'src') },
			// 'app-src': '/src',
			// { find: 'app-lib', replacement: path.resolve(__dirname, 'lib') },
			{
				find: '@yacb-core-lib',
				replacement: path.resolve(__dirname, '../yacb-core2/lib'),
			},
			// {
			// 	find: '@lib',
			// 	replacement: path.resolve(__dirname, '../yacb-core2/lib'),
			// },
		],
	},
}));
