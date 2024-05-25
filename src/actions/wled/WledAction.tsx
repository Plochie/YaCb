// import Command from 'app-lib/components/command-bar/cmd-components';
import { Command } from '@yacb-core-lib';
import { httpFetch } from '@yacb-core-lib/io';
import { LuLightbulb, LuPlus } from 'react-icons/lu';

//
//
export const WledAction = () => {
	//
	//
	return (
		<Command.Group
			title="WLED"
			activation="w"
			id="wled"
			// onConfigChange={onConfigChange}
		>
			<Command.Item
				title="Monitor (192.168.0.102)"
				icon={<LuLightbulb />}
				onClick={() => {
					httpFetch('http://192.168.0.102/json/state', {
						method: 'POST',
						body: {
							type: 'Json',
							payload: { on: 't' },
						},
					})
						.then((r) => {
							console.log(r.data);
						})
						.catch((e) => {
							console.error(e);
						});
				}}
				shortcut={[['Ctrl', 'i']]}
			></Command.Item>
			<Command.Item
				title="Add new WLED"
				icon={<LuPlus />}
				// onClick={() => {}}
				shortcut={[['Ctrl', 'a']]}
			></Command.Item>
		</Command.Group>
	);
};
