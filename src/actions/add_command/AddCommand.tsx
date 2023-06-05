import { FcRadarPlot } from 'react-icons/fc';
import Command from 'app-components/command/cmd-components';
import { Action } from '..';

export const RenderElement = () => {
	return (
		<Command.Item
			title="Add new command"
			icon={<FcRadarPlot />}
			onClick={() => {
				console.log('Clicked from isolated item');
				return 0;
			}}
		></Command.Item>
	);
};

export const AddCommand: Action = {
	RenderElement,
};
