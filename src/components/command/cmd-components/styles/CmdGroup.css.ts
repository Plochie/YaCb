import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from 'app-src/theme/theme.css';

const groupContainer = style({});

const title = style({
	fontSize: calc.subtract(vars.text.baseFontSize, '0.1rem'),
	padding: vars.components.group.padding,
});

export default {
	groupContainer,
	title,
};
