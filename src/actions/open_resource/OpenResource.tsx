import Command from 'app-components/command/cmd-components';
import { useTriggerResult } from 'app-src/hooks';
import { invoke } from 'app-src/wrapper/ipc-wrapper';
import { FcDownRight, FcFile, FcOpenedFolder } from 'react-icons/fc';
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
			<Command.GenericItem>
				<span style={{ fontSize: '0.75em' }}>
					Not finding what you&apos;ve looking for, Refresh index{' '}
				</span>
			</Command.GenericItem>
			{triggerResult?.items.map((item, index) => {
				return (
					<Command.Item
						key={index}
						title={item.data.path}
						icon={item.data.t === 'd' ? <FcOpenedFolder /> : <FcFile />}
						onClick={() => {
							invoke('open_file', { resource: item.data.path });
							return 0;
						}}
						sidePanel={
							<Command.SidePanel>
								{/* <span style={{ fontWeight: 'bold', color: 'white' }}>
									side panel: {item.data.path}
								</span> */}
								<Command.Item
									title={'Open'}
									icon={<FcDownRight />}
									onClick={() => {
										invoke('open_file', { resource: item.data.path });
										return 0;
									}}
								/>
								<Command.Item
									title={'Open containing folder'}
									icon={<FcDownRight />}
									onClick={() => {
										invoke('open_file', { resource: item.data.path });
										return 0;
									}}
								/>
							</Command.SidePanel>
						}
					/>
				);
			})}
		</Command.Group>
	);
};

export const OpenResource: UserAction = {
	resultGroup: RenderGroup,
	action: openResourceAction,
	word: 'o |',
};
