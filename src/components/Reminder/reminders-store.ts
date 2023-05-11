import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface IReminder {
	title: string;
	isDone: boolean;
	assignedCategories: null | string[];
	assignedLists: null | string[];
	assignedTags: null | string[];
	priority: null | '!' | '!!' | '!!!';
	notes: null | string;
}

const reminders: Writable<IReminder[]> = writable([
	{
		title: 'A first reminder',
		isDone: false,
		assignedCategories: ['All'],
		assignedLists: [],
		assignedTags: ['development', 'svelte'],
		priority: '!',
		notes: 'This is a note'
	},
	{
		title: 'Second reminder',
		isDone: true,
		assignedCategories: ['All'],
		assignedLists: [],
		assignedTags: ['food'],
		priority: '!!',
		notes: 'Some more notes here'
	}
]);

export default reminders;
