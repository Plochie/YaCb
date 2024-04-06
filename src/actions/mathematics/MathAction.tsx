import Command, {
	OnInputChangeParams,
} from 'app-components/command/cmd-components';
import Mexp from 'math-expression-evaluator';
import { useState } from 'react';
import { FcCalculator } from 'react-icons/fc';

const mexp = new Mexp();
const supportedTokens: string[] = mexp.tokens
	.sort((a, b) => a.precedence - b.precedence)
	.map((t) => t.token)
	.filter((t) => !/[0-9]| /.test(t));
//
//
const ACTIVATION = 'm';
//
export const RenderGroup = () => {
	//
	const [result, setResult] = useState<string | null>(null);
	//
	const onInputChange = (e: OnInputChangeParams) => {
		//
		if (e.currentInput.trim() === '') {
			setResult(null);
		}

		const ans = mexp.eval(e.query, [], {});
		setResult(ans.toString());
	};
	//
	//
	//
	return (
		<Command.Group
			title="Answer"
			activation={ACTIVATION}
			onInputChange={onInputChange}
		>
			<Command.Item icon={<FcCalculator />}>
				<span style={{ fontSize: '1.5em', lineHeight: '1em' }}>
					<strong>= {result}</strong>
				</span>
			</Command.Item>
			<Command.GenericItem>
				<div
					style={{
						fontSize: '0.8em',
						fontWeight: 'bold',
						marginTop: '5px',
					}}
				>
					{`"${supportedTokens.join('" | "')}"`}
				</div>
			</Command.GenericItem>
		</Command.Group>
	);
};
