import { CommandContext } from 'app-components/command/context';
import React, { useContext } from 'react';
import { Footer } from './cmd-footer';
import { Notify } from './cmd-notify';
import { Page } from './cmd-page';
import styles from './styles/CmdBody.css';

interface BodyProps {
	children: React.ReactNode;
}
//
export const Body = (props: BodyProps) => {
	//
	const commandContext = useContext(CommandContext);
	//
	// item index will store current selected item
	// const store = React.useRef({ itemIndex: 0 }).current;
	//
	// useEffect(() => {
	// 	const items = document.querySelectorAll(
	// 		'[data-yacb="item"]'
	// 	) as NodeListOf<HTMLDivElement>;
	// 	items.forEach((item, index) => {
	// 		item.setAttribute('data-yacb-item-index', '' + index);
	// 		// active element
	// 		if (index === store.itemIndex) {
	// 			item.classList.add(itemStyles.itemHover);
	// 			item.setAttribute('data-yacb-item-active', 'true');
	// 		} //
	// 		else {
	// 			item.classList.remove(itemStyles.itemHover);
	// 			item.setAttribute('data-yacb-item-active', 'false');
	// 		}
	// 	});
	// }, []);
	//
	const children =
		React.Children.toArray(props.children)
			// for page component defined in nested user component
			.filter(
				(x: any) =>
					(x.type === Page && x.props.id === commandContext.currentPage) ||
					(x.type !== Page &&
						typeof x.type === 'function' &&
						x.type({}).props.id === commandContext.currentPage) ||
					x.type === Footer ||
					x.type === Notify
			) ?? [];
	//
	return children.length > 0 ? (
		<div className={styles.bodyContainer}>
			<div className={styles.items}>{children}</div>
			<div className={styles.sidePanel}></div>
		</div>
	) : (
		<></>
	);
};
