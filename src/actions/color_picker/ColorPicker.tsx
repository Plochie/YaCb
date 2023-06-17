import Command from 'app-components/command/cmd-components';
import { writeToClipboard } from 'app-src/wrapper/ipc-wrapper';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { FcPanorama } from 'react-icons/fc';
import { Action, TriggerWordAction } from '..';
import './ColorPicker.scss';
import { generateAnalogousShades, generateShades } from './utils';

const colorPickerAction: TriggerWordAction = () => {
	return new Promise((resolve) => {
		// resolve({ success: { renderResultItem: RenderResultItem } });
		resolve({
			success: {
				items: [{ title: 'color', renderResultItem: RenderResultItem }],
				renderResultItem: RenderResultItem,
			},
		});
	});
};

const RenderElement = () => {
	return (
		<Command.Group title="Color Picker">
			<Command.Item
				title="Color "
				icon={<FcPanorama />}
				onClick={() => {
					console.log('Clicked from isolated item');
					return 0;
				}}
			></Command.Item>
		</Command.Group>
	);
};

const RenderResultItem = () => {
	const [color, setColor] = useState('#ff0000');
	return (
		<Command.Item title="color" alwaysVisible>
			<section className="responsive">
				<HexColorPicker
					color={color}
					onChange={setColor}
					style={{ gridArea: 'color-picker' }}
				/>
				<div className="shades" style={{ gridArea: 'shades1' }}>
					{generateShades(color).map((shade, id) => (
						<div
							className="shade"
							key={id}
							style={{ backgroundColor: shade }}
							onClick={() => {
								writeToClipboard(shade);
							}}
						></div>
					))}
				</div>
				{/* TODO: correct the color format */}
				<div className="shades" style={{ gridArea: 'shades2' }}>
					{generateAnalogousShades(color).map((shade, id) => (
						<div
							className="shade"
							key={id}
							style={{ backgroundColor: shade }}
							onClick={() => {
								writeToClipboard(shade);
							}}
						></div>
					))}
				</div>
				<div className="shades" style={{ gridArea: 'color-string' }}>
					{/* <span>{color}</span> */}
					<table>
						<tbody>
							<tr>
								<td>HEX</td>
								<td>{color}</td>
							</tr>
							<tr>
								<td>RGB</td>
								<td>{color}</td>
							</tr>
							<tr>
								<td>HSL</td>
								<td>{color}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
		</Command.Item>
	);
};

export const ColorPicker: Action = {
	RenderElement,
	triggerWordAction: colorPickerAction,
};
