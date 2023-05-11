import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface IList {
	title: string;
	backgroundColor: string;
	textColor: string;
}

const lists: Writable<IList[]> = writable([
	{
		title: 'Reminders',
		backgroundColor: 'bg-red-400',
		textColor: 'text-white'
	},
	{ title: 'Another list', backgroundColor: 'bg-red-400', textColor: 'text-white' }
]);

export default lists;
