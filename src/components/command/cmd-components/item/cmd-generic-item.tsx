//
interface GenericItemProps {
	children?: React.ReactNode;
	onClick?: () => void;
	style?: React.CSSProperties;
}
//
export const GenericItem = (props: GenericItemProps) => {
	return (
		<div
			className="row margin-h margin-v"
			data-yacb="item-generic-container"
			style={props.style}
			onClick={(e) => {
				e.stopPropagation();
				if (props.onClick) {
					props.onClick();
				}
			}}
		>
			{props.children}
		</div>
	);
};
