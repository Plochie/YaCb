import { createTheme, createThemeContract } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { colord } from 'colord';

export const vars = createThemeContract({
	color: {
		primary: null,
		secondary: null,
		text: {
			primary: null,
		},
	},
	text: {
		font: null,
		baseFontSize: null,
	},
	spacing: null,
	components: {
		container: {
			height: null,
			width: null,
			borderRadius: null,
		},
		input: {
			spacing: null,
			padding: null,
		},
		body: {
			padding: null,
			textColor: null,
		},
		group: {
			padding: null,
		},
		item: {
			titleFontSize: null,
			hoverBackground: null,
			hoverFontColor: null,
		},
	},
});
//
//
interface Colors {
	primary: string;
	secondary: string;
	textColor: string;
	hoverTextColor: string;
}
//
const _darkColors: Colors = {
	primary: 'hsl(0, 0%, 10%)',
	secondary: 'hsl(15, 100%, 20%)',
	textColor: 'hsl(0, 0%, 70%)',
	hoverTextColor: 'hsl(0, 0%, 80%)',
};
//
const _lightColors: Colors = {
	primary: 'hsl(0, 0%, 90%)',
	secondary: 'hsl(15, 100%, 20%)',
	textColor: 'hsl(0, 0%, 10%)',
	hoverTextColor: 'hsl(0, 0%, 90%)',
}; //
const colors = _darkColors;
//
//
export const baseTheme = createTheme(vars, {
	color: {
		primary: colors.primary,
		secondary: colors.secondary,
		text: {
			primary: colors.textColor,
		},
	},
	spacing: '0.45rem',
	text: {
		font: `Roboto`,
		baseFontSize: calc.multiply(vars.spacing, 2),
	},
	components: {
		container: {
			height: '550px',
			width: '700px',
			borderRadius: '0.5rem',
		},
		input: {
			spacing: vars.spacing,
			padding: calc.multiply(vars.spacing, 2),
		},
		body: {
			padding: calc.multiply(vars.spacing, 2),
			textColor: vars.text.font,
		},
		group: {
			padding: `${vars.spacing} 0 ${vars.spacing} ${vars.spacing}`,
		},
		item: {
			titleFontSize: vars.text.baseFontSize,
			hoverBackground: vars.color.secondary,
			hoverFontColor: colors.hoverTextColor,
		},
	},
});
