export * from "./cmd-page";
export * from "./cmd-group";
export * from "./cmd-item";
export * from "./cmd-input";
export * from "./cmd-body";
export * from "./cmd-empty";
export * from "./cmd-footer";
export * from "./cmd-wrapper";

import { Page } from "./cmd-page";
import { Group } from "./cmd-group";
import { Item } from "./cmd-item";
import { Input } from "./cmd-input";
import { Body } from "./cmd-body";
import { Empty } from "./cmd-empty";
import { Footer } from "./cmd-footer";
import { Wrapper } from "./cmd-wrapper";
import { Notify } from "./cmd-notify";

const Command = {
	Page,
	Group,
	Item,
	Input,
	Body,
	Empty,
	Footer,
	Wrapper,
	Notify,
};

export default Command;
