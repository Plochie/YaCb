import { useState } from 'react';
import './CommandBar.scss';
import Command from './cmd-components';
import Actions, {
	TriggerSuccessResultType,
	TriggerType,
	triggerWords,
} from 'app-src/actions';
import { CommandContext } from 'app-components/command/context';

export const CommandBar = () => {
	//
	const [actionLoading, setActionLoading] = useState(false);
	const [triggerResult, setTriggerResult] =
		useState<TriggerSuccessResultType>();
	const [currentPage, setCurrentPage] = useState<string>('home');
	const [inputString, setInputString] = useState('');
	const [matchedTrigger, setMatchedTrigger] = useState<
		TriggerType | undefined
	>();
	const [inputKey, setInputKey] =
		useState<React.KeyboardEvent<HTMLInputElement>>();

	const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		//
		setInputKey(e);
		//
		if (inputString.trim() === '') {
			resetHome();
			return;
		}
		for (const key of Object.getOwnPropertyNames(triggerWords)) {
			const trigger = triggerWords[key];
			if (trigger.action && inputString.startsWith(trigger.word)) {
				//
				const query = inputString.substring(trigger.word.length);
				setMatchedTrigger(trigger);
				setCurrentPage(trigger.pageId as string);

				const resultPromise = trigger.action({
					query,
					inputKey,
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
							// if user has cleared the input then do not show the trigger page
							if (inputString.trim() === '') {
								resetHome();
							}
							setCurrentPage(trigger.pageId);
							setTriggerResult(result.success);
						}
						// TODO: what to do with ignore type of results in TriggerResultType result.ignore
						console.debug('Result ', {
							trigger,
							inputKey,
							inputString,
							query,
							result,
						});
					});
				}
			}
		}
	};

	const onCommandChange = (pattern: string) => {
		setInputString(pattern);
	};

	const setIsActionLoading = (isLoad: boolean) => {
		setActionLoading(isLoad);
	};

	const resetHome = () => {
		setCurrentPage('home');
		setMatchedTrigger(undefined);
	};
	//
	return (
		<Command.Wrapper>
			<CommandContext.Provider
				value={{
					onCommandChange,
					onInputKey,
					inputString,
					matchedTrigger,
					inputKey,
					isActionLoading: actionLoading,
					setIsActionLoading,
					currentPage,
					triggerResult,
				}}
			>
				<Command.Input />
				<Command.Body>
					{/* no results page */}
					{/* TODO: how to use Empty, Notify components here? */}
					<Command.Empty />
					{/* TODO: should home be used here, or it should be action? */}
					{/* <Command.Page id={'home'}>
						{Actions.map((action, actionIdx) => (
							<action.RenderElement key={actionIdx} />
						))}
					</Command.Page> */}
					{Actions.map((action, actionId) => {
						if (action.resultPage) {
							return <action.resultPage key={actionId} />;
						} else {
							return <div key={actionId}></div>;
						}
					})}
				</Command.Body>
			</CommandContext.Provider>
		</Command.Wrapper>
	);
};
