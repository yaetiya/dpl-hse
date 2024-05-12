import type { Icon } from "lucide-svelte";
import type { ComponentType } from "svelte";
import * as Icons from "./icons.js";

export type Route = {
	title: string;
	label?: string;
	icon: any;
	variant: "default" | "ghost";
	name: string;
};
