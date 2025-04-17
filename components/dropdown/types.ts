type Item = {
	id: number | string;
	name: string;
};

interface DropdownProps {
	onValueChange?: (value: Item['id'] | null) => void;
	items: Item[];
}

export type { Item, DropdownProps };
