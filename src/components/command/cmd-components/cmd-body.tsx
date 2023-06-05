import React, { ReactElement, useContext } from 'react';
import { Footer } from './cmd-footer';
import { Notify } from './cmd-notify';
import { Page } from './cmd-page';
import styles from './styles/CmdBody.module.scss';
import { CommandContext } from 'app-components/command/CommandBar';

interface BodyProps {
	children: React.ReactNode;
}

export const Body = (props: BodyProps) => {
	//
	const commandContext = useContext(CommandContext);
	//
	const children = React.Children.toArray(props.children).filter((child) => {
		//
		const x = child as ReactElement;
		//
		return (
			(x.type === Page && x.props.id === commandContext.currentPage) ||
			x.type === Footer ||
			x.type === Notify
		);
	});

	return <div className={styles['body-container']}>{children}</div>;
};
