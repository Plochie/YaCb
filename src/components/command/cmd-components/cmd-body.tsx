// import styles from 'app-src/components/command/cmd-components/styles/CmdBody.css';
import styles from './styles/Command.module.scss';

interface BodyProps {
	children: React.ReactNode;
}
//
export const Body = (props: BodyProps) => {
	//
	// useInputKeyChangeEvent
	//
	return (
		<>
			<div className={`${styles.bodyContainer} br-sm`} data-yacb="body">
				{props.children}
			</div>
			{/* <Notify title="test" desc="tes fd " visible={true} /> */}
		</>
	);
};
