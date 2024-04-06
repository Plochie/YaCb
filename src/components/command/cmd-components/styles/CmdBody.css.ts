import { style } from '@vanilla-extract/css';
import { vars } from 'app-src/theme/theme.css';

const bodyContainer = style({
	overflow: 'hidden',
	marginTop: vars.components.body.padding,
	background: vars.color.primary,
	boxShadow: '0 0 10px rgb(0 0 0 / 100%)',
	display: 'flex',
});

export default {
	bodyContainer,
};
