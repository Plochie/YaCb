import { FcSettings } from 'react-icons/fc';
import { Command, OnInputChangeParams } from '@yacb-core-lib';

/**
 *
 */
const RenderGroup = () => {
	// const _triggerResult = useTriggerResult(RenderGroup);
	//
	return (
		<Command.Group title="Settings" activation="s" id="settings">
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
