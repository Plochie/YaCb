import Command from 'app-components/command/cmd-components';
import { useInputKeyChangeEvent } from 'app-src/components/command/hooks';
import { invoke } from 'app-src/wrapper/ipc-wrapper';
import { useState } from 'react';
import { FcDownRight, FcFile, FcOpenedFolder } from 'react-icons/fc';
import { TriggerWordAction } from '..';
import { writeToClipboard } from 'app-src/wrapper/ipc-wrapper';
/**
 *
 * @param param0
 * @returns
 */
const openResourceAction: TriggerWordAction = ({ query }) => {
	if (query.length > 1) {
		//
		return new Promise((resolve, reject) => {
			//
			// setIsActionLoading(true);
			const invokePromise = invoke<{ path: string; t: string }[]>(
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
				// setIsActionLoading(false);
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
export const OpenResourceAction = () => {
	//
	const [items, setItems] = useState<
		{ title: string; data: { path: string; t: string } }[]
	>([]);
	//

	useInputKeyChangeEvent(({ detail }) => {
		if (detail.currInput.trim() === '') {
			setItems([]);
		}
		return openResourceAction({ query: detail.currInput }).then((d) => {
			if (d.success) {
				setItems(d.success.items as any);
			}
		});
	});
	//
	return (
		<Command.Group title="Open Resource" activation="o">
			<Command.GenericItem>
				Not finding what you&apos;ve looking for, Refresh index{' '}
			</Command.GenericItem>
			{items.map((item, index) => {
				return (
					<Command.Item
						// shortcut={[['ctrl', '1']]}
						key={index}
						title={item.data.path}
						icon={item.data.t === 'd' ? <FcOpenedFolder /> : <FcFile />}
						onClick={() => {
							console.log('item clicked');
							invoke('open_file', { resource: item.data.path });
							return 0;
						}}
					>
						<Command.SidePanel visible={true} flex={0.7}>
							<Command.GenericItem>
								<span>
									{item.data.t === 'd' ? (
										<FcOpenedFolder size={'5rem'} />
									) : (
										<FcFile size={'5rem'} />
									)}
								</span>
							</Command.GenericItem>
							<Command.GenericItem>
								<span>{item.data.path}</span>
							</Command.GenericItem>
							<Command.PanelItem
								title={'Open'}
								icon={<FcDownRight />}
								onClick={() => {
									console.log('open file called');
									invoke('open_file', { resource: item.data.path });
									return 0;
								}}
							/>
							<Command.PanelItem
								title={'Open containing folder'}
								icon={<FcDownRight />}
								onClick={() => {
									console.log('open containing folder called');
									invoke('open_containing_folder', {
										resource: item.data.path,
									});
									return 0;
								}}
							/>
							<Command.PanelItem
								title={'Copy Path'}
								icon={<FcDownRight />}
								onClick={() => {
									writeToClipboard(item.data.path);
									return 0;
								}}
							/>
						</Command.SidePanel>
					</Command.Item>
				);
			})}
		</Command.Group>
	);
};
