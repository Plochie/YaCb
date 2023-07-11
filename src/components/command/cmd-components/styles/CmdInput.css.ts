import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from 'app-src/theme/theme.css';
import { calc } from '@vanilla-extract/css-utils';

const inputContainer = style({
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
});

const input = style({
	display: 'flex',
	width: '100%',
});

globalStyle(`${input} input`, {
	letterSpacing: '1px',
	boxSizing: 'border-box',
	fontFamily: vars.text.font,
	fontWeight: 'bold',
	border: 'none',
	width: '100%',
	background: 'transparent',
	fontSize: calc.multiply(vars.components.input.spacing, 3),
	padding: vars.components.input.spacing,
	outline: 'none',
	color: 'inherit',
});

const rightContainer = style({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	padding: '0 4px 0 4px',
});

const icon = style({
	fontSize: calc.multiply(vars.components.input.spacing, 3.5),
	margin: '0 4px 0 4px',
	opacity: '0.6',
});

export default { inputContainer, input, rightContainer, icon };

// 	// border-animation
// 	.border {
// 		position: relative;
// 		width: 100%;

// 		&:after,
// 		&:before {
// 			border-radius: 5px;
// 			content: '';
// 			position: absolute;
// 			background: linear-gradient(
// 				45deg,
// 				#fb0094,
// 				#00ff00,
// 				#ffff00,
// 				#ff0000,
// 				#ffff00,
// 				#00ff00,
// 				#fb0094
// 			);
// 			width: 100%;
// 			height: 1px;
// 			z-index: 1;
// 			background-size: 200%;
// 			animation: steam 2.5s linear infinite;
// 		}

// 		&:after {
// 			filter: blur(4px);
// 		}

// 		@keyframes steam {
// 			0% {
// 				background-position: 200% 0;
// 			}

// 			100% {
// 				background-position: 0 0;
// 			}
// 		}
// 	}
// }
