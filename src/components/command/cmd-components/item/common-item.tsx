// import styles from 'app-src/components/command/cmd-components/styles/CmdItem.css';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Command.module.scss';

export interface CommonItemProps {
	title?: string;
	data?: any;
	icon?: React.ReactElement;
	children?: React.ReactNode;
	shortcut?: string[][];
	onClick?: () => number | void;
	onHover?: () => void;
	onIsActiveChange?: (v: boolean) => void;
	containerStyles?: React.CSSProperties;
	attr: string;
}
//
export const CommonItem = (props: CommonItemProps) => {
	//
	const ref = useRef<any>();
	const [isActive, setIsActive] = useState(false);
	//
	//
	const eventHandler = (data: { detail: { active: boolean } }) => {
		setIsActive(data.detail.active);
		if (props.onIsActiveChange) {
			props.onIsActiveChange(data.detail.active);
		}
	};

	useEffect(() => {
		ref.current.addEventListener('stateChange', eventHandler, false);
		return () => {
			ref.current?.removeEventListener('stateChange', eventHandler);
		};
	}, []);
	//
	return (
		<div
			ref={ref}
			className="row margin-h"
			onClick={(e) => {
				e.stopPropagation();
				if (props.onClick) {
					props.onClick();
				}
			}}
			style={props.containerStyles}
			onMouseEnter={props.onHover}
			data-yacb={props.attr}
		>
			<div
				className={`${styles.item} ${isActive ? styles.itemHover : ''} row`}
				data-yacb="item"
			>
				{/* icons */}
				{props.icon && (
					<div className="text-lg is-horizontal-align">{props.icon}</div>
				)}
				{/* item content */}
				<div className="col padding-v padding-h">
					<div className={styles.title}>{props.title}</div>
					{/* components related to specific item components */}
					{props.children}
				</div>
				{/* item shortcut */}
				{props.shortcut && (
					<div className={styles.shortcut}>
						{props.shortcut.map((w, i) => {
							return w.map((sj, j) => {
								let s = sj;
								if (sj === ' ') {
									s = 'Space';
								}
								return <kbd key={i + j}>{s}</kbd>;
							});
						})}
					</div>
				)}
			</div>
		</div>
	);
};
