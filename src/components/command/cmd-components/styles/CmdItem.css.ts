import { ComplexStyleRule, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from 'app-src/theme/theme.css';

const ItemHoverCss: ComplexStyleRule = {
	color: vars.components.item.hoverFontColor,
	// backgroundColor: vars.components.item.hoverBackground,
	backgroundColor: '#333333',
	borderRadius: '8px',
	border: '1px solid #555555',
	// boxShadow: '0 0 10px #444',
	transition: '250ms ease-in-out',
};

const item = style({
	padding: vars.spacing,
	alignItems: 'center',
	flex: 1,
	// borderTop: '1px solid #FFFFFF20',
	':hover': ItemHoverCss,
});

const genericItem = style({
	padding: vars.spacing,
});

const itemHover = style(ItemHoverCss);

const shortcut = style({
	display: 'flex',
	marginLeft: 'auto',
	gap: '5px',
});

export default {
	item,
	genericItem,
	itemHover,
	shortcut,
};
