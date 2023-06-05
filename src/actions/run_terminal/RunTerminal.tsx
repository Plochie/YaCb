import Command from 'app-components/command/cmd-components';
import { invoke } from 'app-src/wrapper/ipc-wrapper';
import { Action } from '..';

const RenderElement = () => {
	return (
		<Command.Group title="Terminal">
			<Command.Item
				title="⌨️&nbsp;&nbsp;&nbsp;&nbsp;Run terminal command"
				onClick={() => {
					console.log('Clicked from isolated item');
					invoke('run_cmd', {
						commandStr: '.\\external_binaries\\fd.exe',
					});
					return 0;
				}}
			></Command.Item>
		</Command.Group>
	);
};

export const RunTerminal: Action = {
	RenderElement,
};
