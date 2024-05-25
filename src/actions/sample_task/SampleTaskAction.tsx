import { Command } from '@yacb-core-lib';
import { useState } from 'react';
import { RiTestTubeLine } from 'react-icons/ri';

//
//
export const SampleTaskAction = () => {
	//
	const [result, setResult] = useState<string | null>(null);
	//
	//
	return (
		<Command.Group title="Sample Task" activation="test" id="sample_task">
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
