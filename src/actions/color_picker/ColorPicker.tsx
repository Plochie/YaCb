import Command from 'app-components/command/cmd-components';
import { Colord, colord, extend } from 'colord';
import harmonies from 'colord/plugins/harmonies';
import mixPlugin from 'colord/plugins/mix';
import { useState } from 'react';
import { HslaColorPicker } from 'react-colorful';
import './ColorPicker.scss';
import { Shade } from './Shade';
import { COLOR_FORMATS } from './constant';
import { LuPipette } from 'react-icons/lu';
import { openWindow } from 'app-src/wrapper/ipc-wrapper';
extend([mixPlugin, harmonies]);
//
export const ColorPickerAction = () => {
	//
	const [color, setColor] = useState({ h: 0, s: 100, l: 50, a: 1 });
	const [format, setFormat] = useState<(typeof COLOR_FORMATS)[number]>('Hex');
	//
	const renderColors = (colors: Colord[], position: 'col' | 'row') => {
		return (
			<div className={`shades ${position}`}>
				{colors.map((color, id) => (
					<Shade key={id} color={color} format={format} />
				))}
			</div>
		);
	};
	//
	return (
		<Command.Group title="Color Picker" activation="c">
			<Command.GenericItem>
				<div className="col">
					{/*  */}
					<div className="row format-select">
						<LuPipette
							className="text-lg"
							onClick={async () => {
								// invoke('color_picker').then((d) => {
								// 	console.log(d);
								// 	//
								// 	// console.log('setting window');
								// 	const webview = new WebviewWindow('theUniqueLabel', {
								// 		url: '/about',
								// 	});
								// 	webview.once('tauri://created', function () {
								// 		// webview window successfully created
								// 		console.log('setting window opened');
								// 	});
								// 	webview.once('tauri://error', function (e) {
								// 		// an error occurred during webview window creation
								// 		console.log(e);
								// 	});
								// });
								await openWindow(
									'/color_picker_window',
									'color_picker_window',
									50,
									50
								);
							}}
						/>
						<select
							name="format"
							id="format"
							onChange={(e) => {
								setFormat(e.target.value as any);
							}}
						>
							{COLOR_FORMATS.map((format, index) => (
								<option key={index} value={format}>
									{format}
								</option>
							))}
						</select>
						{/*  */}
						<Shade color={colord(color)} format={format} />
					</div>
					{/*  */}
					<div className="responsive row  padding-v">
						<HslaColorPicker color={color} onChange={setColor} />
						{renderColors(colord(color).tones(5), 'col')}
						{renderColors(colord(color).tints(5), 'col')}
					</div>
					{/*  */}
					<div className="row padding-v">
						{renderColors(
							colord(color).harmonies('double-split-complementary'),
							'row'
						)}
					</div>
				</div>
			</Command.GenericItem>
		</Command.Group>
	);
};
