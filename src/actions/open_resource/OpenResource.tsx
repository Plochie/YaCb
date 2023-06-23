import Command from 'app-components/command/cmd-components';
import { useTriggerResult } from 'app-src/hooks';
import { invoke } from 'app-src/wrapper/ipc-wrapper';
import { FcFile, FcOpenedFolder } from 'react-icons/fc';
import { TriggerWordAction, UserAction } from '..';

/**
 *
 * @param param0
 * @returns
 */
const openResourceAction: TriggerWordAction = ({
	query,
	setIsActionLoading,
}) => {
	if (query.length > 1) {
		//
		return new Promise((resolve, reject) => {
			//
			setIsActionLoading(true);
			const invokePromise = invoke<{ path: string; t: string }[]>(
				// IMPROVEMENT: should use get_matched_files ?
				'get_matched_files',
				{
					// fetchLatest: false,
					query: `${query}`,
				}
			);
			//
			invokePromise.then((indexedContent) =>
				resolve({
					success: {
						items: indexedContent.map((i) => ({ title: i.path, data: i })),
					},
				})
			);
			//
			invokePromise.catch((err) => reject(err));
			//
			invokePromise.finally(() => {
				setIsActionLoading(false);
			});
		});
	} //
	return new Promise((resolve) => {
		resolve({});
	});
};

/**
 *
 */
const RenderGroup = () => {
	const triggerResult = useTriggerResult(RenderGroup);
	//
	return (
		<Command.Group title="Open Resource">
			{triggerResult?.items.map((item, index) => {
				return (
					<Command.Item
						key={index}
						title={item.data.path}
						icon={item.data.t === 'd' ? <FcOpenedFolder /> : <FcFile />}
						onClick={() => {
							console.log('Clicked from use defined item item');
							return 0;
						}}
					></Command.Item>
				);
			})}
		</Command.Group>
	);
};

export const OpenResource: UserAction = {
	resultGroup: RenderGroup,
	action: openResourceAction,
	word: 'o ',
};
