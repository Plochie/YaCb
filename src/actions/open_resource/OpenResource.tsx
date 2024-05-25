import { Command, OnInputChangeParams } from '@yacb-core-lib';
import { invoke, writeToClipboard } from '@yacb-core-lib/io';
import { useState } from 'react';
import { FcDownRight, FcFile, FcOpenedFolder } from 'react-icons/fc';

interface ListItem {
	title: string;
	data: { path: string; t: string };
}

/**
 *
 */
export const OpenResourceAction = () => {
	//
	const [items, setItems] = useState<ListItem[]>([]);
	//

	const onInputChange = async (e: OnInputChangeParams) => {
		const query = e.currentInput.trim();
		if (query === '') {
			setItems([]);
		}
		if (query.length > 1) {
			// const items = await openResourceAction(query);
			const data = await invoke<{ path: string; t: string }[]>(
				'get_matched_files',
				{
					query: `${query}`,
				}
			);
			const items = data.map((i) => ({ title: i.path, data: i }));
			setItems(items);
		}
	};
	//
	return (
		<Command.Group
			title="Open Resource"
			activation="o"
			id="open_resource"
			onInputChange={onInputChange}
		>
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
