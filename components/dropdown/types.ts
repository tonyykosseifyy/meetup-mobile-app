type Item = {
	id: number | string;
	name: string;
	value: string;
};

interface DropdownProps {
	onValueChange?: (value: Item['id'] | null) => void;
	items: Item[];
	defaultValue?: Item['id'];
}

export type { Item, DropdownProps };
