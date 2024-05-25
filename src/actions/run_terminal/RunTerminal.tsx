import { Command } from '@yacb-core-lib';
import { invoke } from '@yacb-core-lib/io';

export const RunTerminalAction = () => {
	return (
		<Command.Group title="Terminal" activation=">" id="run_terminal">
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

// export const RunTerminal: Action = {
// 	RenderElement,
// };
