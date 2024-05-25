import { Command, OnInputChangeParams } from '@yacb-core-lib';
import { useConfigState } from '@yacb-core-lib';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';

//
interface Todo {
	title: string;
	creationTime: string;
	updateTime: string;
}
//
interface Config {
	todos?: Todo[];
}
//
export const TodoAction = () => {
	//
	const [input, setInput] = useState('');
	const [config, setConfig] = useConfigState<Config>();
	//
	const onInputChange = (e: OnInputChangeParams) => {
		const input = e.query.trim();
		setInput(input);
	};
	//
	const initConfig = (data: any) => {
		if (!data.todos || !Array.isArray(data.todos)) {
			data.todos = [];
		}
		setConfig(data);
	};
	//
	return (
		<Command.Group
			title="Todo list"
			activation="t"
			id="todo_list"
			onInputChange={onInputChange}
			initConfig={initConfig}
			config={config}
		>
			<Command.Item
				title={`Add new todo - ${input}`}
				icon={<LuPlus />}
				onClick={() => {
					setConfig((prev) => {
						prev?.todos?.push({
							title: input,
							creationTime: new Date().toISOString(),
							updateTime: new Date().toISOString(),
						});
					});
				}}
			></Command.Item>
			{/*  */}
			{config?.todos?.map((todo, index) => (
				<Command.Item
					key={index}
					title={`${todo.title} ${todo.updateTime}`}
				></Command.Item>
			))}
		</Command.Group>
	);
};
