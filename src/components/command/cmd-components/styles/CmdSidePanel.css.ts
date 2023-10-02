import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from 'app-src/theme/theme.css';
import { colord } from 'colord';

const sidePanel = style({
	flex: 1,
	height: calc.subtract(vars.components.container.height, '75px'),
	position: 'sticky',
	alignSelf: 'flex-start',
	top: 0,
	borderLeft: `1px solid ${vars.color.secondary}`,
	margin: vars.spacing,
	padding: `0 0 0 ${vars.spacing}`,
});

export default {
	sidePanel,
};
