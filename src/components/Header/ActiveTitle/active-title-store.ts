import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface IActiveTitle {
	title: string;
	type: 'List' | 'Tag' | 'Category' | 'Priority';
	textColor: string;
	backgroundColor: string;
}

const activeTitle: Writable<IActiveTitle> = writable({
	title: 'Today',
	type: 'Category',
	textColor: 'text-blue-400',
	backgroundColor: 'bg-blue-400'
});

export default activeTitle;
