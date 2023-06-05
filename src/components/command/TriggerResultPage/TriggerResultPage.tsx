import Command from 'app-components/command/cmd-components';
import { CommandContext } from 'app-components/command/CommandBar';
import { invoke } from 'app-src/wrapper/ipc-wrapper';
import { useContext, createElement } from 'react';
import { FcBookmark } from 'react-icons/fc';

export const TriggerResultGroup = () => {
	const { triggerResult } = useContext(CommandContext);

	return (
		<Command.Group title="Result">
			{triggerResult.data.map((result, idx) => {
				return triggerResult.renderResultItem ? (
					<triggerResult.renderResultItem key={idx} title={result} />
				) : (
					<Command.Item
						key={idx}
						title={result}
						icon={<FcBookmark />}
						onClick={() => {
							console.log('Clicked from isolated item');
							invoke('open_resource', { resource: result });
							return 0;
						}}
					></Command.Item>
				);
			})}
			<Command.Item
				title="no result found"
				icon={<FcBookmark />}
				onClick={() => {
					console.log('Clicked from isolated item');
					return 0;
				}}
			></Command.Item>
		</Command.Group>
		// <Command.Group title="Result">
		// 	<Command.Item
		// 		title={'result item'}
		// 		icon={<FcBookmark />}
		// 		onClick={() => {
		// 			console.log('Clicked from isolated item');
		// 			return 0;
		// 		}}
		// 	></Command.Item>
		// </Command.Group>
	);
};
