import Command from 'app-components/command/cmd-components';
import { CommandContext } from 'app-components/command/context';
import { useContext } from 'react';

export const TriggerResultGroup = () => {
	const { triggerResult } = useContext(CommandContext);
	//
	return triggerResult && triggerResult.items ? (
		<Command.Group title={triggerResult?.groupTitle}>
			{triggerResult.items &&
				triggerResult.items.map((item, idx) => {
					// preference to component defined with item array
					return item.renderResultItem ? (
						<item.renderResultItem
							key={idx}
							title={item.title}
							data={item.data}
						/>
					) : (
						// if not present use generic component
						// <triggerResult.renderResultItem
						// 	key={idx}
						// 	title={item.title}
						// 	data={item.data}
						// />
						<></>
					);
				})}
		</Command.Group>
	) : (
		<></>
	);
};
