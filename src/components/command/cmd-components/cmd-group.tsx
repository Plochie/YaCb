import { useInputKeyChangeEvent } from 'app-src/components/command/hooks';
import React, { KeyboardEvent, useState } from 'react';

export type GroupType = React.ReactElement<
	GroupProps,
	React.JSXElementConstructor<React.Component<typeof Group>>
>;

export interface OnInputChangeParams {
	currentInput: string;
	keyEvent: KeyboardEvent<HTMLInputElement>;
	query: string;
}

interface GroupProps {
	title?: string;
	children?: React.ReactNode[] | React.ReactNode;
	itemIndex?: number;
	activation: string;
	onInputChange?: (e: OnInputChangeParams) => void;
}

/**
 *
 * @param props
 * @returns
 */
export const Group = (props: GroupProps) => {
	//
	const [isActivated, setIsActivated] = useState(false);
	//
	useInputKeyChangeEvent(({ detail }) => {
		if (detail.currInput.startsWith(props.activation + ' ')) {
			setIsActivated(true);
			//
			if (props.onInputChange) {
				props.onInputChange({
					currentInput: detail.currInput,
					keyEvent: detail.keyEvent,
					query: detail.currInput.replace(props.activation + ' ', ''),
				});
			}
		} //
		else {
			setIsActivated(false);
		}
	});
	//
	return isActivated ? (
		<div
			className="col"
			data-yacb="group"
			style={{ overflowY: 'scroll', height: '100%' }}
		>
			{props.title && props.title.trim() !== '' && (
				<div className="row margin-h margin-v">
					<span>{props.title}</span>
				</div>
			)}
			{props.children}
		</div>
	) : (
		<></>
	);
};
