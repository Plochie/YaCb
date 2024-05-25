import { writeToClipboard } from '@yacb-core-lib/io';
import { Colord, colord } from 'colord';
import './ColorPicker.scss';
import { COLOR_FORMATS } from './constant';
//
const colordToString = (
	color: Colord,
	format: (typeof COLOR_FORMATS)[number]
): string => {
	if (format === 'Hex') {
		return color.toHex();
	} else if (format === 'Hsl') {
		return color.toHslString();
	} else if (format === 'Hsv') {
		return color.toHsv() + '';
	} else if (format === 'Rgb') {
		return color.toRgbString();
	}
	throw new Error(`${format} is not supported.`);
};
//
interface ShadeProps {
	color: Colord;
	format: (typeof COLOR_FORMATS)[number];
}
//
export const Shade = ({ color, format }: ShadeProps) => {
	//
	//
	const colorStr = colordToString(color, format);
	const c = colord(color);
	let textColor = c.isLight() ? 'black' : 'white';
	if (c.alpha() < 0.5) {
		textColor = 'black';
	}
	//
	return (
		<div
			className="row shadeWrapper"
			// style={{ backgroundColor: color }}
			onClick={() => {
				writeToClipboard(colorStr);
			}}
		>
			{/* inner div to set actual selected color */}
			<div
				className="shade padding-sm row is-vertical-align"
				style={{ backgroundColor: colorStr, color: textColor }}
			>
				<span>{colorStr}</span>
				{/* <LuCopy style={{ fontSize: '1.1rem' }} /> */}
			</div>
		</div>
	);
};
