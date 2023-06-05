import Command, {
	ItemProps,
	ItemType,
} from 'app-components/command/cmd-components';
import { FcOpenedFolder } from 'react-icons/fc';
import { Action, TriggerWordAction } from '..';
import { invoke } from 'app-src/wrapper/ipc-wrapper';

const openResourceAction: TriggerWordAction = ({
	query,
	setIsActionLoading,
	inputKey,
}) => {
	if (query.length > 3) {
		//
		return new Promise((resolve, reject) => {
			//
			setIsActionLoading(true);
			const invokePromise = invoke<string[]>('get_indexed_files', {
				fetchLatest: false,
				query,
			});
			//
			invokePromise.then((indexedContent) =>
				resolve({ data: indexedContent, renderResultItem: RenderResultItem })
			);
			//
			invokePromise.catch((err) => reject(err));
			//
			invokePromise.finally(() => {
				setIsActionLoading(false);
			});
		});
	}
};

const RenderElement = () => {
	return (
		<Command.Group title="Resources">
			<Command.Item
				title="Find files"
				icon={<FcOpenedFolder />}
				onClick={() => {
					console.log('Clicked from isolated item');
					return 0;
				}}
			></Command.Item>
		</Command.Group>
	);
};

const RenderResultItem = ({ title }: ItemProps) => {
	return (
		<Command.Item
			title={title}
			icon={<FcOpenedFolder />}
			onClick={() => {
				console.log('Clicked from use defined item item');
				return 0;
			}}
		></Command.Item>
	);
};

export const OpenResource: Action = {
	RenderElement,
	triggerWordAction: openResourceAction,
};
