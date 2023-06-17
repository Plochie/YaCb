import { CommandContext } from 'app-components/command/context';
import { Loader } from 'app-src/components/loader/Loader';
import { useContext } from 'react';
import { CgSearch } from 'react-icons/cg';
import styles from './styles/CmdInput.module.scss';

export const Input = () => {
	const commandContext = useContext(CommandContext);

	return (
		<div className={styles['input-container']}>
			<div className={styles.input}>
				<input
					// value={value}
					onChange={(e) => {
						const str = e.target.value;
						commandContext.onCommandChange(str);
					}}
					onKeyUp={(e) => {
						commandContext.onInputKey(e);
					}}
				></input>
				<div className={styles['right-container']}>
					{!commandContext.isActionLoading && (
						<CgSearch className={styles.icon} />
					)}
					<Loader isLoading={commandContext.isActionLoading} />
				</div>
			</div>
			{/* {commandContext.isActionLoading && <div className={styles.border}></div>} */}
		</div>
	);
};
