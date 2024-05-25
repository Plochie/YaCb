/* eslint-disable no-restricted-imports */
import { createDir, exists, readTextFile, readDir } from '@tauri-apps/api/fs';
import { appConfigDir } from '@tauri-apps/api/path';
import { Config } from '@yacb-core-lib';
import { Actions } from 'app-src/actions';
import path from 'path';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';

export function SettingWindow() {
	//
	const [configs, setConfigs] = useImmer<Config<any>[]>([]);
	//
	useEffect(() => {
		(async () => {
			console.log('test');
			const p = await appConfigDir();
			const groupConfigFolder = path.join(p, 'configs');
			const _configs = await Promise.all(
				(
					await readDir(groupConfigFolder)
				)
					.map((f) => path.join(f.path, 'config.json'))
					.map(async (c) => {
						if (await exists(c)) {
							const configStr = await readTextFile(c);
							return JSON.parse(configStr);
						}
						return undefined;
					})
			);
			setConfigs(_configs);
		})();
	}, []);

	return (
		<div
			style={{
				backgroundColor: '#333',
				height: '100vh',
				width: '100vw',
				color: 'white',
			}}
		>
			<div className="row">
				{/* {configs.map((config, index) => (
					<div key={index} className="row">
						{config.id} - {config.title} - {config.activation}
					</div>
				))} */}
				<div className="col" style={{ border: '1px solid red' }}>
					{configs.map((config, index) => (
						<div key={index} className="row margin-h margin-v">
							<strong>{config.title}</strong>
						</div>
					))}
				</div>
				<div className="col" style={{ border: '1px solid red' }}></div>
			</div>
		</div>
	);
}
