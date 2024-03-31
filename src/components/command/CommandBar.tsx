import { CommandContext } from 'app-components/command/context';
import Actions, { Action, TriggerSuccessResultType } from 'app-src/actions';
import { clearLastPublishedKeyChangeEvent } from 'app-src/events';
import { useInputKeyChangeEvent } from 'app-src/hooks';
import { baseTheme } from 'app-src/theme/theme.css';
import { useState } from 'react';
import { FcFlashOn } from 'react-icons/fc';
import { TriggerResultGroup } from './TriggerResultPage/TriggerResultPage';
import Command from './cmd-components';
//
//
export const CommandBar = () => {
	//
	const [actionLoading, setActionLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState<string>('home');
	const [matchedActions, setMatchedActions] = useState<Action[]>([]);
	const [triggerResults, setTriggerResults] = useState<
		Map<string, TriggerSuccessResultType>
	>(new Map());
	//
	useInputKeyChangeEvent(({ detail }) => {
		const keyEvent = detail.keyEvent;
		const currInput = detail.currInput;
		//
		//
		if (currInput.trim() === '') {
			resetHome();
			return;
		}
		// clear variables
		// DO NOT RESET trigger results here, this will cause ghosting between renders
		// check all matching actions
		const _matchedActions: Set<Action> = new Set();
		const _triggerResults: Map<string, TriggerSuccessResultType> = new Map();
		let isActionsCalled = false;
		for (const action of Actions) {
			//
			const word = action.word.split('|').find((w) => currInput.startsWith(w));
			if (word !== undefined) {
				//
				const query = currInput.substring(word.length);
				_matchedActions.add(action);
				// if key length is greater than 1, consider it to be modifier
				if (
					!action.invokeActionOnModifier &&
					keyEvent.key.length > 1 &&
					keyEvent.key !== 'Backspace'
				) {
					continue;
				}
				isActionsCalled = true;
				//
				const resultPromise = action.action({
					query,
					keyEvent,
					setIsActionLoading,
				});
				if (resultPromise) {
					// TODO: what to do with errors?
					resultPromise.catch((err) => {
						console.error(err);
					});
					// handler result
					resultPromise.then((result) => {
						// if result received show "triggerResult" page but use
						if (result.success) {
							// on new result reset the itemIndex to 0
							// FIXME: reset item hover index to 0
							// store.itemIndex = 0;
							setCurrentPage('resultPage');
							setTriggerResults((p) => {
								p.set(
									action._groupId,
									result.success as TriggerSuccessResultType
								);
								return new Map(p);
							});
							_triggerResults.set(action._groupId, result.success);
						} //
						else if (result.ignore) {
							_triggerResults.delete(action._groupId);
						}

						// TODO: what to do with ignore type of results in TriggerResultType result.ignore
						if (result.success) {
							console.debug('✅ Result', {
								action,
								keyEvent,
								currInput,
								query,
								result,
							});
						} else {
							console.debug('⚠️ Result', {
								action,
								keyEvent,
								currInput,
								query,
								result,
							});
						}
					});
				}
			}
		}
		//
		isActionsCalled &&
			console.debug(`🚀 matched triggers: `, { _matchedActions });
		// set actions according to priority of result
		setMatchedActions(
			[..._matchedActions].sort((a, b) => b._priority - a._priority)
		);
	});
	//
	//
	const setIsActionLoading = (isLoad: boolean) => {
		setActionLoading(isLoad);
	};
	//
	const resetHome = () => {
		setCurrentPage('home');
		setMatchedActions([]);
		setTriggerResults(new Map());
		clearLastPublishedKeyChangeEvent();
	};
	//
	return (
		<Command.Wrapper theme={baseTheme}>
			<CommandContext.Provider
				value={{
					isActionLoading: actionLoading,
					setIsActionLoading,
					currentPage,
					matchedActions,
					triggerResults,
				}}
			>
				<Command.Input />
				<Command.Body>
					{/* no results page */}
					{/* TODO: how to use Empty, Notify components here? */}
					{/* TODO: should home be used here, or it should be action? */}
					<Command.Page id="home" key="home">
						<Command.Group title="Commands">
							{Actions.map((action, actionIdx) => (
								<Command.Item
									onClick={() => console.log(`logged ${action._groupId}`)}
									key={actionIdx}
									icon={<FcFlashOn />}
									title={`${action._priority} ${action._groupId}`}
									alwaysVisible
									shortcut={action.word.split('|').map((s) => s.split(''))}
								/>
							))}
						</Command.Group>
					</Command.Page>
					<Command.Page id="resultPage" key="resultPage">
						<TriggerResultGroup />
					</Command.Page>
				</Command.Body>
			</CommandContext.Provider>
		</Command.Wrapper>
	);
};
