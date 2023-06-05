import { useEffect, useState } from 'react';
import styles from './Loader.module.scss';
import { ImSpinner2 } from 'react-icons/im';

interface LoaderProps {
	isLoading: boolean;
}

const FADE_ANIM_TIME = 0.2;

export const Loader = ({ isLoading }: LoaderProps) => {
	//
	const [loadState, setLoadState] = useState(false);
	//
	useEffect(() => {
		if (!isLoading) {
			setTimeout(
				() => {
					setLoadState(false);
				},
				// some offset is required here as element have different animations
				FADE_ANIM_TIME * 1000 - 40
			);
			// setLoadState(false);
		} else {
			setLoadState(true);
		}
	}, [isLoading]);
	//
	return (
		<>
			{loadState && (
				<div
					className={styles['loader-container']}
					style={{
						animation: isLoading
							? `${FADE_ANIM_TIME}s ease-in fadeIn`
							: `${FADE_ANIM_TIME}s ease-out fadeOut`,
					}}
				>
					<ImSpinner2 className={styles.icon} />
				</div>
			)}
		</>
	);
};
