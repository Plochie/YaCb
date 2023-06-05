import { useEffect, useState } from 'react';
import './CommandBar.scss';
import Command from './cmd-components';

import Actions, { TriggerResultType, TriggerWords } from 'app-src/actions';
import { invoke } from 'app-src/wrapper/ipc-wrapper';
import { createContext } from 'react';
import { TriggerResultGroup } from './TriggerResultPage/TriggerResultPage';

export const CommandContext = createContext<{
	pattern: string;
	inputKey?: React.KeyboardEvent<HTMLInputElement>;
	onCommandChange: (str: string) => void;
	onInputKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	isActionLoading: boolean;
	setIsActionLoading: (isLoading: boolean) => void;
	currentPage: string;
	triggerResult: TriggerResultType;
}>({
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onCommandChange: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onInputKey: () => {},
	pattern: '',
	isActionLoading: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setIsActionLoading: () => {},
	currentPage: 'home',
	triggerResult: { data: [] },
});

export const CommandBar = () => {
	//
	const [actionLoading, setActionLoading] = useState(false);
	const [triggerResult, setTriggerResult] = useState<TriggerResultType>({
		data: [],
	});
	const [currentPage, setCurrentPage] = useState<string>('home');
	const [pattern, setPattern] = useState('');
	const [inputKey, setInputKey] =
		useState<React.KeyboardEvent<HTMLInputElement>>();

	const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		setInputKey(e);
	};

	const onCommandChange = (pattern: string) => {
		setPattern(pattern);
	};

	const setIsActionLoading = (isLoad: boolean) => {
		setActionLoading(isLoad);
	};

	//
	useEffect(() => {
		let isTriggerWordMatched = false;
		for (const word of TriggerWords) {
			if (word.action && pattern.startsWith(word.triggerWord)) {
				//
				isTriggerWordMatched = true;
				//
				const query = pattern.substring(word.triggerWord.length);
				const resultPromise = word.action({
					query,
					inputKey,
					setIsActionLoading,
				});
				if (resultPromise) {
					resultPromise.then((result) => {
						setTriggerResult(result);
						setCurrentPage('triggerResult');
						// if result received show "triggerResult" page
						console.log('Result ', { word, inputKey, pattern, query, result });
					});
				}
			}
		}
		if (!isTriggerWordMatched) {
			setCurrentPage('home');
		}
	}, [inputKey, setCurrentPage]);
	//
	//
	return (
		<Command.Wrapper>
			<CommandContext.Provider
				value={{
					onCommandChange,
					onInputKey,
					pattern,
					inputKey,
					isActionLoading: actionLoading,
					setIsActionLoading,
					currentPage,
					triggerResult,
				}}
			>
				<button
					onClick={() => {
						invoke('backend_logging', { msg: '' });
					}}
				>
					Test
				</button>
				<Command.Input />
				<Command.Body>
					{/* no results page */}
					<Command.Notify
						visible={false}
						type="output"
						title="This is test"
						desc="Some description for the notification system to test the performance."
					/>
					<Command.Empty />

					<Command.Page id={'home'}>
						{Actions.map((action, actionIdx) => (
							<action.RenderElement key={actionIdx} />
						))}
					</Command.Page>
					{/* page for results of trigger commands */}
					<Command.Page id={'triggerResult'}>
						<TriggerResultGroup />
					</Command.Page>
					<Command.Page id={'testPage'}></Command.Page>
					{/* <CommandFooter /> */}
				</Command.Body>
			</CommandContext.Provider>
		</Command.Wrapper>
	);
};
