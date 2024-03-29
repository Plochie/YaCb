import { style, ComplexStyleRule } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from 'app-src/theme/theme.css';

const ItemHoverCss: ComplexStyleRule = {
	backgroundColor: vars.components.item.hoverBackground,
	fontWeight: 'bold',
	color: vars.components.item.hoverFontColor,
};

const itemContainer = style({
	display: 'flex',
	flexDirection: 'row',
});

const item = style({
	padding: calc.subtract(vars.spacing, '2px'),
	margin: '5px 0 0 0',
	alignItems: 'center',
	borderRadius: calc.subtract(vars.components.container.borderRadius, '0.1rem'),
	':hover': ItemHoverCss,
	flex: 1,
	display: 'flex',
});

const itemHover = style(ItemHoverCss);

const itemChildren = style({
	flex: '1',
	wordBreak: 'break-all',
	fontSize: vars.components.item.titleFontSize,
});

const icon = style({
	marginRight: '0.75em',
	fontSize: calc.multiply(vars.spacing, 3),
	alignSelf: 'baseline',
});

const shortcut = style({
	display: 'flex',
	marginLeft: 'auto',
	gap: '5px',
});

export default {
	itemContainer,
	item,
	itemHover,
	itemChildren,
	icon,
	shortcut,
};
