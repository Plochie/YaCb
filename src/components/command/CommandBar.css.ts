import { style } from '@vanilla-extract/css';
import { vars } from 'app-src/theme/theme.css';
import { calc } from '@vanilla-extract/css-utils';

const commandBarContainer = style({
	color: vars.color.text.primary,
	display: 'flex',
	flex: '1',
	flexDirection: 'column',
	width: '100%',
	wordBreak: 'break-word',
	fontFamily: vars.text.font,
	minWidth: vars.components.container.width,
	maxHeight: vars.components.container.height,
	background: vars.color.primary,
	borderRadius: vars.components.container.borderRadius,
	margin: calc.add('20px', '5px'),
	padding: vars.spacing,
	boxShadow: '0 0 20px rgb(0 0 0 / 100%)',
});

export default {
	commandBarContainer,
};
