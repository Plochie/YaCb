import { CommandContext } from 'app-components/command/context';
import { useContext } from 'react';

export const TriggerResultGroup = () => {
	const { matchedActions } = useContext(CommandContext);
	//
	// console.log(matchedActions);
	return (
		<>
			{Array.from(matchedActions ?? []).map((action, actionKey) => {
				return <action.resultGroup key={actionKey} />;
			})}
		</>
	);
};
