import Command from 'app-components/command/cmd-components';
import { useInputKeyChangeEvent } from 'app-src/components/command/hooks';
import { useState } from 'react';
import { RiTestTubeLine } from 'react-icons/ri';
import { TriggerWordAction } from '..';

//
const longRunningAction: TriggerWordAction = () => {
	//
	return new Promise((resolve) => {
		//
		try {
			setTimeout(() => {
				resolve({
					success: {
						items: [],
					},
				});
			}, 5000);
		} catch (err) {
			resolve({
				ignore: { caller: 'mathEvalAction', msg: 'expression is not complete' },
			});
		}
	});
};
//
//
export const RenderGroup = ({ showPanel = true }: { showPanel?: boolean }) => {
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
		return longRunningAction({ query: detail.currInput }).then((d) => {
			if (d.success) {
				console.log('long running task ended');
				setResult('long running task ended');
			}
		});
	});
	//
	//
	return (
		<Command.Group title="Long running task" activation="test">
			<Command.Item
				title="Long running test"
				icon={<RiTestTubeLine />}
				onClick={() => {
					console.log('clicked from long running task');
				}}
				shortcut={[['Ctrl', 'i']]}
			>
				{/* <span style={{ fontSize: '1.5em', lineHeight: '1em' }}>
					<strong>{result}</strong>
				</span>
				<div
					style={{
						fontSize: '0.8em',
						fontWeight: 'bold',
						marginTop: '5px',
					}}
				>
					<h3>loader</h3>
					<Loader isLoading={result !== null} />
				</div> */}
				{showPanel && (
					<Command.SidePanel>
						<div>
							<h3>header 1</h3>
						</div>
						<div>
							<h3>header 2</h3>
						</div>
					</Command.SidePanel>
				)}
			</Command.Item>
		</Command.Group>
	);
};
