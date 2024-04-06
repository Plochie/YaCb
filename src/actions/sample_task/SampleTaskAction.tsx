import Command from 'app-components/command/cmd-components';
import { useInputKeyChangeEvent } from 'app-src/components/command/hooks';
import { useState } from 'react';
import { RiTestTubeLine } from 'react-icons/ri';
import { TriggerWordAction } from '..';
import { Loader } from 'app-src/components/loader/Loader';

//
//
export const RenderGroup = () => {
	//
	const [result, setResult] = useState<string | null>(null);
	//
	useInputKeyChangeEvent(({ detail }) => {
		//
		if (detail.currInput.trim() === '') {
			setResult(null);
		}
		// console.log({ detail });
		console.log('long running task started');
		setResult('');
	});
	//
	//
	return (
		<Command.Group title="Sample Task">
			<Command.Item
				title="Sample Task"
				icon={<RiTestTubeLine />}
				onClick={() => {
					console.log('clicked from long running task');
				}}
				shortcut={[['Ctrl', 'i']]}
			>
				<span style={{ fontSize: '1.5em', lineHeight: '1em' }}>
					<strong>{result}</strong>
				</span>
				{/* <div
					style={{
						fontSize: '0.8em',
						fontWeight: 'bold',
						marginTop: '5px',
					}}
				>
					<h3>loader</h3>
					<Loader isLoading={result !== null} />
				</div> */}
				<Command.SidePanel>
					<Command.Item title="Option 1" />
					<Command.Item title="Option 2" />
					<Command.Item title="Option 3" />
					<Command.Item title="Option 4" />
				</Command.SidePanel>
			</Command.Item>
		</Command.Group>
	);
};
