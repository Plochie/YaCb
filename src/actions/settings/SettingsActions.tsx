import Command from 'app-components/command/cmd-components';
import { useTriggerResult } from 'app-src/hooks';
import { invoke } from 'app-src/wrapper/ipc-wrapper';
import { FcFile, FcOpenedFolder, FcSettings } from 'react-icons/fc';
import { TriggerWordAction, UserAction } from '..';

/**
 *
 * @param param0
 * @returns
 */
const settingsAction: TriggerWordAction = () => {
	return new Promise((resolve) => {
		resolve({ success: { items: [] } });
	});
};

/**
 *
 */
const RenderGroup = () => {
	const _triggerResult = useTriggerResult(RenderGroup);
	//
	return (
		<Command.Group title="Settings">
			<Command.Item
				title="Global Shortcut"
				icon={<FcSettings />}
				onClick={() => {
					// invoke('open_file', { resource: item.data.path });
					return 0;
				}}
			>
				Test Setting
			</Command.Item>
		</Command.Group>
	);
};

export const SettingsActions: UserAction = {
	resultGroup: RenderGroup,
	action: settingsAction,
	word: 's ',
};
