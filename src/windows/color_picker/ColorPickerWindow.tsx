import { useEffect, useRef } from 'react';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { emit, listen } from '@tauri-apps/api/event';
import { appWindow, invoke } from '@yacb-core-lib/io';
import { PhysicalPosition, PhysicalSize } from '@tauri-apps/api/window';

export function ColorPickerWindow() {
	//
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		appWindow.setSize(new PhysicalSize(50, 50));
		listen('event-name', (d: any) => {
			console.log('data from event', d.payload.MouseMove);
			const { x, y } = d.payload.MouseMove;
			appWindow.setSize(new PhysicalSize(50, 50));
			appWindow.setPosition(new PhysicalPosition(x - 25, y - 25));
		});

		setTimeout(() => {
			console.log('event invoked from frontend');
			invoke('start_input_event');
		}, 1000);

		return () => {
			console.log('component unmounted');
		};
	}, []);

	return (
		<div
			ref={ref}
			style={{
				boxShadow: '0 0 5px white',
				height: '50px',
				width: '50px',
				background: 'transparent',
			}}
			onClick={() => {
				console.log('wrapper clicked');
				appWindow.close();
			}}
		>
			<div></div>
		</div>
	);
}
