import { CommandContext } from 'app-components/command/context';
import Actions, { Action, TriggerSuccessResultType } from 'app-src/actions';
import { clearLastPublishedKeyChangeEvent } from 'app-src/events';
import { useKeyChangeEvent } from 'app-src/hooks';
import { useState } from 'react';
import './CommandBar.scss';
import { TriggerResultGroup } from './TriggerResultPage/TriggerResultPage';
import Command from './cmd-components';
//
export const CommandBar = () => {
	//
	const [actionLoading, setActionLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState<string>('home');
	const [matchedActions, setMatchedActions] = useState<Set<Action>>(new Set());
	const [triggerResults, setTriggerResults] = useState<
		Map<string, TriggerSuccessResultType>
	>(new Map());
	//
	useKeyChangeEvent(({ detail }) => {
		const keyEvent = detail.keyEvent;
		const currInput = detail.currInput;
		// TODO: what to do with modifier
		if (keyEvent.key === 'ArrowUp') {
			console.log('hello');
		}
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
		for (const trigger of Actions) {
			if (trigger.action && currInput.startsWith(trigger.word)) {
				//
				_matchedActions.add(trigger);
				const query = currInput.substring(trigger.word.length);
				const resultPromise = trigger.action({
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
							setCurrentPage('resultPage');
							setTriggerResults((p) => {
								p.set(
									trigger.groupId,
									result.success as TriggerSuccessResultType
								);
								return new Map(p);
							});
							_triggerResults.set(trigger.groupId, result.success);
						}
						// TODO: what to do with ignore type of results in TriggerResultType result.ignore
						if (result.success) {
							console.debug('✅ Result', {
								trigger,
								keyEvent,
								currInput,
								query,
								result,
							});
						} else {
							console.debug('⚠️ Result', {
								trigger,
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
		console.debug(`🚀 matched triggers: `, { _matchedActions });
		//
		setMatchedActions(_matchedActions);
	});
	//
	//
	const setIsActionLoading = (isLoad: boolean) => {
		setActionLoading(isLoad);
	};

	const resetHome = () => {
		setCurrentPage('home');
		setMatchedActions(new Set());
		setTriggerResults(new Map());
		clearLastPublishedKeyChangeEvent();
	};
	//
	return (
		<Command.Wrapper>
			<CommandContext.Provider
				value={{
					isActionLoading: actionLoading,
					setIsActionLoading,
					currentPage,
					// triggerResult,
					matchedActions,
					triggerResults,
				}}
			>
				<Command.Input />
				<Command.Body>
					{/* no results page */}
					{/* TODO: how to use Empty, Notify components here? */}
					<Command.Empty />
					{/* TODO: should home be used here, or it should be action? */}
					<Command.Page id="home" key="home">
						<Command.Group title="Commands">
							{Actions.map((action, actionIdx) => (
								<Command.Item
									key={actionIdx}
									title={`✨ ${action.groupId}      ⌨️ '${action.word}'`}
									alwaysVisible
								/>
							))}
						</Command.Group>
					</Command.Page>
					<Command.Page id="resultPage" key="resultPage">
						<TriggerResultGroup />
					</Command.Page>
					{/* {Actions.map((action, actionId) => {
						if (action.resultPage) {
							return <action.resultPage key={actionId} />;
						} else {
							return <div key={actionId}></div>;
						}
					})} */}
				</Command.Body>
			</CommandContext.Provider>
		</Command.Wrapper>
	);
};
