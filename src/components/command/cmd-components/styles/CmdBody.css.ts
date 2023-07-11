import { style } from '@vanilla-extract/css';
import { vars } from 'app-src/theme/theme.css';
import { colord } from 'colord';

const bodyContainer = style({
	overflow: 'auto',
	overscrollBehavior: 'contain',
	marginTop: vars.components.body.padding,
	padding: `${vars.components.body.padding} 0 0 0`,
	display: 'flex',
	flexDirection: 'row',
	borderTop: `1px solid ${vars.color.secondary}`,
	// border: '2px solid red',
});

const items = style({
	flex: 1,
});

const sidePanel = style({
	flex: 1,
});

export default {
	bodyContainer,
	items,
	sidePanel,
};
