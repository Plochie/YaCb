import { style } from '@vanilla-extract/css';

export const groupsContainer = style({
	flex: '1',
});

export const pageContainer = style({
	flexDirection: 'row',
	position: 'relative',
	width: '100%',
	display: 'flex',
});

export const panelContainer = style({
	width: '40%',
	height: '100%',
	// TODO: how to add webkit data here?
	//   position: "-webkit-sticky",
	position: 'sticky',
	top: '0',
	borderLeft: '3px solid #2e2d2d',
	padding: '0.7em',
	textAlign: 'center',
});

export default {
	groupsContainer,
	pageContainer,
	panelContainer,
};
