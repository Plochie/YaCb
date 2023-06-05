import React from "react";

interface FooterProps {
	children?: React.ReactNode;
}

export const Footer = (props: FooterProps) => {
	return <div className="footer-container">{props.children}</div>;
};
