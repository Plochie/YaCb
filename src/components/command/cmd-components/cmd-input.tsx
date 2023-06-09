import { CommandContext } from 'app-components/command/context';
import { Loader } from 'app-src/components/loader/Loader';
import { publishKeyChangeEvent } from 'app-src/events';
import { useContext } from 'react';
import { CgSearch } from 'react-icons/cg';
import styles from './styles/CmdInput.css';

export const Input = () => {
	//
	const commandContext = useContext(CommandContext);
	//
	return (
		<div className={styles.inputContainer}>
			<div className={styles.input}>
				<input
					className={styles.input}
					autoFocus
					onKeyUp={(e) => {
						// e.preventDefault();
						e.stopPropagation();
						publishKeyChangeEvent({
							currInput: (e.target as any).value as string,
							keyEvent: e,
						});
					}}
					onKeyDown={(e) => {
						// ignore events for arrow up and down as these will be used in
						// global document key event handler hook
						if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
							e.preventDefault();
						}
					}}
				></input>
				<div className={styles.rightContainer}>
					{commandContext.isActionLoading ? (
						<Loader isLoading={commandContext.isActionLoading} />
					) : (
						<CgSearch className={styles.icon} />
					)}
				</div>
			</div>
		</div>
	);
};
