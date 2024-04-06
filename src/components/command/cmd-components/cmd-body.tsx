import styles from 'app-src/components/command/cmd-components/styles/CmdBody.css';

interface BodyProps {
	children: React.ReactNode;
}
//
export const Body = (props: BodyProps) => {
	//
	return (
		<>
			<div className={`${styles.bodyContainer}`} data-yacb="body">
				{props.children}
			</div>
			{/* <Notify title="test" desc="tes fd " visible={true} /> */}
		</>
	);
};
