import Command from 'app-src/components/command/cmd-components';
//
export function HomeAction() {
	//
	return (
		<Command.Group title="Home" activation="h">
			<Command.GenericItem>
				<span>Home</span>
			</Command.GenericItem>
		</Command.Group>
	);
}
