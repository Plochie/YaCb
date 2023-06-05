import styles from "./styles/CmdEmpty.module.scss";

export const Empty = () => {
	return (
		<div className={styles.container}>
			<span>No Results Found..</span>
		</div>
	);
};
