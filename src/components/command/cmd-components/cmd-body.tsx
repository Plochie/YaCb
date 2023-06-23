import { CommandContext } from 'app-components/command/context';
import React, { useContext } from 'react';
import { Footer } from './cmd-footer';
import { Notify } from './cmd-notify';
import { Page, PageProps } from './cmd-page';
import { runOnlyOnce } from './index';
import styles from './styles/CmdBody.module.scss';
import Actions from 'app-src/actions';

interface BodyProps {
	children: React.ReactNode;
}
//

//
export const Body = (props: BodyProps) => {
	//
	const commandContext = useContext(CommandContext);
	//
	const children =
		React.Children.toArray(props.children)
			// for page component defined in nested user component
			// .map((x: any) =>
			// 	x.type !== Page && typeof x.type === 'function' ? x.type({}) : x
			// )
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
	//
	return children.length > 0 ? (
		<div className={styles['body-container']}>{children}</div>
	) : (
		<></>
	);
};
