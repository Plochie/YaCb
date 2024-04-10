import React, { useEffect, useRef } from 'react';
// import styles from '../CommandBar.css';
import styles from './styles/Command.module.scss';
import { LogicalSize, appWindow } from '@tauri-apps/api/window';

//
interface WrapperProps {
	children: React.ReactNode;
	theme?: string;
}

export const Wrapper = (props: WrapperProps) => {
	//
	const ref = useRef<HTMLDivElement>(null);
	//
	useEffect(() => {
		if (!ref.current) return;
		const resizeObserver = new ResizeObserver((e) => {
			// console.log('resize: ', e);
			// console.log(
			// 	'resize: ',
			// 	e[0].borderBoxSize[0].inlineSize,
			// 	e[0].borderBoxSize[0].blockSize
			// );
			const width = 700;
			// const width = 650;
			const height = e[0].borderBoxSize[0].blockSize;
			//
			appWindow.setSize(new LogicalSize(width, height));
		});
		resizeObserver.observe(ref.current);
		return () => resizeObserver.disconnect(); // clean up
	}, []);
	// render
	return (
		<div ref={ref} className={styles.commandBarContainer}>
			{props.children}
		</div>
	);
};
