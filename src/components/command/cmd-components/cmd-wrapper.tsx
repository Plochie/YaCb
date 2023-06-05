import React from "react";

interface WrapperProps {
	children: React.ReactNode;
}

export const Wrapper = (props: WrapperProps) => {
	return <div className="command-bar-container dark">{props.children}</div>;
};
