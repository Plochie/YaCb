import { CommandContext } from 'app-src/components/command/CommandBar';
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
					{/* <IoSparklesSharp
						className={styles.icon}
						style={{ color: '#ffc107' }}
					/> */}
					{!commandContext.isActionLoading && (
						<CgSearch className={styles.icon} />
					)}
					{/* <AiOutlineDrag
					className={styles.icon}
					data-tauri-drag-region
					style={{ cursor: 'move', zIndex: '999' }}
				/> */}
					<Loader isLoading={commandContext.isActionLoading} />
				</div>
			</div>
			{/* {commandContext.isActionLoading && <div className={styles.border}></div>} */}
		</div>
	);
};
