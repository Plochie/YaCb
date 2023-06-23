import { CommandContext } from 'app-components/command/context';
import { Loader } from 'app-src/components/loader/Loader';
import { useContext } from 'react';
import { CgSearch } from 'react-icons/cg';
import styles from './styles/CmdInput.module.scss';
import { publishKeyChangeEvent } from 'app-src/events';

export const Input = () => {
	//
	const commandContext = useContext(CommandContext);
	//
	return (
		<div className={styles['input-container']}>
			<div className={styles.input}>
				<input
					// onChange={(e) => {
					// 	const str = e.target.value;
					// 	commandContext.onCommandChange(str);
					// }}
					onKeyUp={(e) => {
						e.preventDefault();
						publishKeyChangeEvent({
							currInput: (e.target as any).value as string,
							keyEvent: e,
						});
					}}
				></input>
				<div className={styles['right-container']}>
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
