import { colord } from 'colord';

const correctiveHSL = ({
	hc,
	sc,
	lc,
	h,
	s,
	l,
}: {
	hc: number;
	sc: number;
	lc: number;
	h: number;
	s: number;
	l: number;
}) => {
	const hf = (x: number, value: number) =>
		value + x > 360 ? value + x - 360 : value + x;
	const sf = (x: number, value: number) =>
		value + x > 100 ? value + x - 100 : value + x;
	const lf = (x: number, value: number) =>
		value + x > 100 ? value - x : value + x;

	return `hsl(${hf(hc, h)}, ${sf(sc, s)}%, ${lf(lc, l)}%)`;
};

export const generateShades = (color: string): string[] => {
	const { h, s } = colord(color).toHsl();

	return [
		'hsl(' + h + ', ' + s + '%, ' + 80 + '%)',
		'hsl(' + h + ', ' + s + '%, ' + 65 + '%)',
		'hsl(' + h + ', ' + s + '%, ' + 50 + '%)',
		'hsl(' + h + ', ' + s + '%, ' + 35 + '%)',
		'hsl(' + h + ', ' + s + '%, ' + 20 + '%)',
	];
};

export const generateAnalogousShades = (color: string): string[] => {
	const { h, s, l } = colord(color).toHsl();

	return [
		correctiveHSL({ h, s, l, hc: -60, sc: -15, lc: 10 }),
		correctiveHSL({ h, s, l, hc: -30, sc: 15, lc: 10 }),
		correctiveHSL({ h, s, l, hc: 0, sc: 0, lc: 0 }),
		correctiveHSL({ h, s, l, hc: 30, sc: -15, lc: 10 }),
		correctiveHSL({ h, s, l, hc: 60, sc: 15, lc: 10 }),
	];
};
