import Command from 'app-components/command/cmd-components';
import { useTriggerResult } from 'app-src/hooks';
import Mexp from 'math-expression-evaluator';
import { FcCalculator } from 'react-icons/fc';
import { TriggerWordAction, UserAction } from '..';

const mexp = new Mexp();
const supportedTokens: string[] = mexp.tokens
	.sort((a, b) => a.precedence - b.precedence)
	.map((t) => t.token)
	.filter((t) => !/[0-9]| /.test(t));
//
const mathEvalAction: TriggerWordAction = ({ query }) => {
	//
	return new Promise((resolve) => {
		//
		try {
			const ans = mexp.eval(query, [], {});
			resolve({
				success: {
					items: [{ title: 'calculate', data: ans.toString() }],
				},
			});
		} catch (err) {
			resolve({
				ignore: { caller: 'mathEvalAction', msg: 'expression is not complete' },
			});
		}
	});
};
//
//
const RenderGroup = () => {
	const triggerResult = useTriggerResult(RenderGroup);

	return (
		<Command.Group title="Answer">
			{triggerResult?.items.map((item, index) => {
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
							{`"${supportedTokens.join('" | "')}"`}
						</div>
					</Command.Item>
				);
			})}
		</Command.Group>
	);
};

export const MathEvalAction: UserAction = {
	word: '',
	action: mathEvalAction,
	resultGroup: RenderGroup,
	priority: 1,
};
