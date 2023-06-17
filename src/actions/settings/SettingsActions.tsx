import Command, { ItemProps } from 'app-components/command/cmd-components';
import { FcFile, FcOpenedFolder, FcSettings } from 'react-icons/fc';
import { Action, TriggerWordAction } from '..';

/**
 *
 */
const settingsAction: TriggerWordAction = () => {
	return new Promise((resolve) => {
		// resolve({ success: { renderResultItem: RenderResultItem } });
		resolve({
			success: {
				items: [{ title: 'color', renderResultItem: RenderResultItem }],
				renderResultItem: RenderResultItem,
			},
		});
	});
};

/**
 *
 * @returns
 */
const RenderElement = () => {
	return (
		<Command.Group title="Setting">
			<Command.Item
				title="Settings"
				icon={<FcSettings />}
				onClick={() => {
					console.log('Clicked from isolated item');
					return 0;
				}}
			></Command.Item>
		</Command.Group>
	);
};

/**
 *
 * @param param0
 * @returns
 */
const RenderResultItem = ({ title, data }: ItemProps) => {
	return (
		<Command.Item
			title={title}
			icon={<FcSettings />}
			onClick={() => {
				console.log('Clicked from use defined item item');
				return 0;
			}}
		></Command.Item>
	);
};

export const SettingsAction: Action = {
	RenderElement,
	triggerWordAction: settingsAction,
};
