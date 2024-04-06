import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from 'app-src/theme/theme.css';

const desc = style({
	fontSize: '0.9em',
});

const icon = style({
	fontSize: 'var(--item-icon-size)',
	marginRight: '7.5px',
});

const notifyContainer = style({
	padding: '10px',
	borderRadius: '10px',
	backgroundColor: vars.color.primary,
	border: '1px solid #555',
	display: 'flex',
	position: 'absolute',
	// bottom: '-3rem',
	right: calc.multiply(vars.spacing, 2),
	bottom: calc.multiply(vars.spacing, 2),
	// top
});

const title = style({
	fontWeight: 'bold',
	fontSize: '1em',
});

export default {
	desc,
	icon,
	notifyContainer,
	title,
};
