import { useContext, useState } from 'react';
import Command from 'app-components/command/cmd-components';
import { invoke } from 'app-src/wrapper/ipc-wrapper';
import { FcFile, FcOpenedFolder } from 'react-icons/fc';
import { Action, TriggerWordAction } from '..';
import { CommandContext } from 'app-components/command/context';
import styles from './OpenResource.module.scss';

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
				'get_indexed_files',
				{
					fetchLatest: false,
					query,
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
const RenderPage = () => {
	const context = useContext(CommandContext);
	const [selectedItem, setSelectedItem] = useState<any>({});

	return (
		<Command.Page
			id="openResource"
			trigger={{
				word: 'o ',
				action: openResourceAction,
				pageId: 'openResource',
			}}
		>
			{/* panel */}
			<Command.SidePanel>
				<div className={styles.panel}>
					<div className={styles.icon}>
						{selectedItem.t === 'd' ? <FcOpenedFolder /> : <FcFile />}
					</div>
					<div>
						<span>{selectedItem.path}</span>
					</div>
				</div>
			</Command.SidePanel>
			<Command.Group>
				{context.triggerResult?.items.map((item, index) => {
					return (
						<Command.Item
							key={index}
							title={item.data.path}
							icon={item.data.t === 'd' ? <FcOpenedFolder /> : <FcFile />}
							onClick={() => {
								console.log('Clicked from use defined item item');
								return 0;
							}}
							onHover={() => {
								setSelectedItem(item.data);
							}}
						></Command.Item>
					);
				})}
			</Command.Group>
		</Command.Page>
	);
};

export const OpenResource: Action = {
	resultPage: RenderPage,
	pageId: 'openResource',
};
