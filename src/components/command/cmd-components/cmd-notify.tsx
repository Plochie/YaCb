import { CgClose } from 'react-icons/cg';
import { FcAdvertising, FcCancel, FcCheckmark } from 'react-icons/fc';
import styles from './styles/CmdNotify.css';

type IconTypes = 'success' | 'error' | 'output' | undefined;

interface NotifyProps {
	title: string;
	desc: string;
	type?: IconTypes;
	visible: boolean;
}

export const Notify = (props: NotifyProps) => {
	//
	const iconType = (type: IconTypes) => {
		if (type === 'success') {
			return { icon: <FcCheckmark />, border: '5px solid #3f9042' };
		} else if (type === 'error') {
			return { icon: <FcCancel />, border: '5px solid #d50000' };
		} else {
			return { icon: <FcAdvertising />, border: '5px solid rgb(72, 72, 211)' };
		}
	};

	const { icon, border } = iconType(props.type);

	//
	return props.visible ? (
		<div className={styles.notifyContainer} style={{ borderLeft: border }}>
			<div className={styles.icon}>{icon}</div>
			<div style={{ flexDirection: 'column' }}>
				{props.title && <div className={styles.title}>{props.title}</div>}
				{props.desc && <div className={styles.desc}>{props.desc}</div>}
			</div>
			<div>
				<CgClose />{' '}
			</div>
		</div>
	) : (
		<></>
	);
};
