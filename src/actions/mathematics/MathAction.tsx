import Command from 'app-components/command/cmd-components';
import { CommandContext } from 'app-src/components/command/context';
import Mexp from 'math-expression-evaluator';
import { useContext } from 'react';
import { FcCalculator } from 'react-icons/fc';
import { Action, TriggerWordAction } from '..';

const mexp = new Mexp();
const supported_tokens: string[] = mexp.tokens
	.sort((a, b) => a.precedence - b.precedence)
	.map((t) => t.token)
	.filter((t) => !/[0-9]| /.test(t));
//
export const mathEvalAction: TriggerWordAction = ({ query }) => {
	//
	return new Promise((resolve) => {
		//
		try {
			const ans = mexp.eval(query, [], {});
			resolve({
				success: {
					groupTitle: 'Answer',
					items: [{ title: 'calculate', data: ans.toString() }],
				},
			});
		} catch (err) {
			console.debug(err);
			resolve({
				ignore: { caller: 'mathEvalAction', msg: 'expression is not complete' },
			});
		}
	});
};

// eslint-disable-next-line react-refresh/only-export-components
// const RenderResultItem = ({ data }: ItemProps) => {
// 	console.log(supported_tokens);
// 	return (
// 		<Command.Item title="math output" alwaysVisible icon={<FcCalculator />}>
// 			<span style={{ fontSize: '1.5em', lineHeight: '1em' }}>
// 				<strong>{data}</strong>
// 			</span>
// 			<div style={{ fontSize: '0.8em', fontWeight: 'bold', marginTop: '5px' }}>
// 				{`"${supported_tokens.join('" | "')}"`}
// 			</div>
// 		</Command.Item>
// 	);
// };

// export const MathAction: Action = {
// 	RenderElement,
// 	triggerWordAction: colorPickerAction,
// };

const RenderPage = () => {
	const context = useContext(CommandContext);

	return (
		<Command.Page
			id="mathEvalAction"
			trigger={{
				word: 'm ',
				action: mathEvalAction,
				pageId: 'mathEvalAction',
			}}
		>
			{/*  */}
			<Command.Group>
				{context.triggerResult?.items.map((item, index) => {
					return (
						<Command.Item
							key={index}
							title="math output"
							alwaysVisible
							icon={<FcCalculator />}
						>
							<span style={{ fontSize: '1.5em', lineHeight: '1em' }}>
								<strong>{item.data}</strong>
							</span>
							<div
								style={{
									fontSize: '0.8em',
									fontWeight: 'bold',
									marginTop: '5px',
								}}
							>
								{`"${supported_tokens.join('" | "')}"`}
							</div>
						</Command.Item>
					);
				})}
			</Command.Group>
		</Command.Page>
	);
};

export const MathEvalAction: Action = {
	resultPage: RenderPage,
	pageId: 'openResource',
};
