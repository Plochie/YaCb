import { style } from '@vanilla-extract/css';
import { vars } from 'app-src/theme/theme.css';

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
	padding: vars.spacing,
});

export default {
	commandBarContainer,
};
