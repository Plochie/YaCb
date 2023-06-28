import { ResultGroup, TriggerSuccessResultType } from 'app-src/actions';
import { CommandContext } from 'app-src/components/command/context';
import { useContext } from 'react';
// IMPROVEMENT: can we have a parameter less hook?
export function useTriggerResult(
	node: () => React.ReactNode
): TriggerSuccessResultType | undefined {
	//
	const group = node as ResultGroup;
	// TODO:  throw error if not correct node
	const context = useContext(CommandContext);
	return context.triggerResults?.get(group._groupId);
}
