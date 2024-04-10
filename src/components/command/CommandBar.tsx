import { ColorPickerAction } from 'app-src/actions/color_picker/ColorPicker';
import { MathEvalAction } from 'app-src/actions/mathematics/MathAction';
import { OpenResourceAction } from 'app-src/actions/open_resource/OpenResource';
import Command from './cmd-components';
//
//
export const CommandBar = () => {
	//
	return (
		<Command.Wrapper>
			<Command.Input />
			<Command.Body>
				{/* <Command.Page id="home" title="home">
				</Command.Page> */}
				<Command.Page id="result" title="result">
					{/* <SampleTask.resultGroup /> */}
					{/* <LongRunningAction.resultGroup showPanel={false} /> */}
					<ColorPickerAction />
					<OpenResourceAction />
					<MathEvalAction />
				</Command.Page>
			</Command.Body>
		</Command.Wrapper>
	);
};
