import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface IActiveTitle {
	title: string;
	type: 'List' | 'Tag' | 'Category' | 'Priority';
}

const activeTitle: Writable<IActiveTitle> = writable({ title: 'All', type: 'Category' });

export default activeTitle;
