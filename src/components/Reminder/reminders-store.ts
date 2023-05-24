import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface IReminder {
	title: string;
	isDone: boolean;
	isMarked: boolean;
	assignedCategories: string[];
	assignedLists: string[];
	assignedTags: string[];
	priority: 'none' | '!' | '!!' | '!!!';
	notes: string;
	url: string;
}

const reminders: Writable<IReminder[]> = writable([
	{
		title: 'A first reminder',
		isDone: false,
		isMarked: false,
		assignedCategories: ['All'],
		assignedLists: [],
		assignedTags: ['development', 'svelte'],
		priority: '!',
		notes: 'This is a note',
		url: 'https://kit.svelte.dev'
	},
	{
		title: 'Second reminder',
		isDone: true,
		isMarked: true,
		assignedCategories: ['All'],
		assignedLists: [],
		assignedTags: ['food'],
		priority: '!!',
		notes: 'Some more notes here',
		url: ''
	}
]);

export default reminders;
