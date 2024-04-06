import Command from 'app-components/command/cmd-components';
import { writeToClipboard } from 'app-src/wrapper/ipc-wrapper';
import { useState } from 'react';
import { HslaColorPicker } from 'react-colorful';
import './ColorPicker.scss';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import harmonies from 'colord/plugins/harmonies';
extend([mixPlugin, harmonies]);

//
export const ColorPickerAction = () => {
	//
	const [color, setColor] = useState({ h: 0, s: 100, l: 50, a: 1 });
	//
	const renderColors = (colors: string[]) => {
		return (
			<div className="shades col" style={{ gridArea: 'shades1' }}>
				{colors.map((color, id) => {
					const c = colord(color);
					let textColor = c.isLight() ? 'black' : 'white';
					if (c.alpha() < 0.5) {
						textColor = 'black';
					}

					return (
						<div
							className="react-colorful__alpha, react-colorful__alpha-pointer shadeWrapper"
							key={id}
							// style={{ backgroundColor: color }}
							onClick={() => {
								writeToClipboard(color);
							}}
						>
							<div className="shade row" style={{ backgroundColor: color }}>
								<div className="col-1">
									<span style={{ color: textColor }}>100</span>
								</div>
								<div className="col">
									<span style={{ color: textColor }}>{color}</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	};
	//
	return (
		<Command.Group title="Color Picker" activation="c">
			<Command.GenericItem>
				<div className="responsive">
					<HslaColorPicker color={color} onChange={setColor} />
					{renderColors(
						colord(color)
							.tones(5)
							.map((s) => s.toHslString())
					)}
					{renderColors(
						colord(color)
							.tints(5)
							.map((s) => s.toHslString())
					)}
					{/* {renderColors(
						colord(color)
							.harmonies('triadic')
							.map((s) => s.toHslString())
					)} */}
					{/*  */}
					{/* <div className="shades" style={{ gridArea: 'shades1' }}>
						{generateShades(color).map((shade, id) => (
							<div
								className="shade"
								key={id}
								style={{ backgroundColor: shade.color }}
								onClick={() => {
									writeToClipboard(shade.color);
								}}
							>
								<span>{shade.prct + '0'}</span>
								<span>{shade.color}</span>
							</div>
						))}
					</div> */}
					{/* <div className="shades" style={{ gridArea: 'shades2' }}>
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
					</div> */}
					{/* <div className="shades" style={{ gridArea: 'color-string' }}>
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
					</div> */}
				</div>
			</Command.GenericItem>
		</Command.Group>
	);
};
