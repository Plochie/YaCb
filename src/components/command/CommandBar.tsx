import { MathEvalAction } from 'app-src/actions/mathematics';
import { OpenResource } from 'app-src/actions/open_resource';
import { baseTheme } from 'app-src/theme/theme.css';
import Command from './cmd-components';
import { ColorPickerAction } from 'app-src/actions/color_picker/ColorPicker';
//
//
export const CommandBar = () => {
	//
	return (
		<Command.Wrapper theme={baseTheme}>
			<Command.Input />
			<Command.Body>
				<Command.Page id="page.1" title="page.1">
					{/* <SampleTask.resultGroup /> */}
					{/* <LongRunningAction.resultGroup showPanel={false} /> */}
					<ColorPickerAction />
					<OpenResource.resultGroup />
					<MathEvalAction.resultGroup />
				</Command.Page>
			</Command.Body>
		</Command.Wrapper>
	);
};

/**

Wrapper
	Input
	Body
		Page
			Group
		Footer
		Notify

 */
