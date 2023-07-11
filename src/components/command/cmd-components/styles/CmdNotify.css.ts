import { style } from '@vanilla-extract/css';

const desc = style({
	fontSize: '0.9em',
});

const icon = style({
	fontSize: 'var(--item-icon-size)',
	marginRight: '7.5px',
});

const notifyContainer = style({
	padding: '10px',
	marginTop: '10px',
	borderRadius: '10px',
	backgroundColor: 'black',
	display: 'flex',
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
