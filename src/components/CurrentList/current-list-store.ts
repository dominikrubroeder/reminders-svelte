import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { IReminder } from '../Reminder/reminders-store';

export interface ICurrentList {
	title: string;
	type: 'List' | 'Tag' | 'Category' | 'Priority';
	textColor: string;
	backgroundColor: string;
	reminders: IReminder[];
}

const currentListStore: Writable<ICurrentList> = writable({
	title: 'Today',
	type: 'Category',
	textColor: 'text-blue-400',
	backgroundColor: 'bg-blue-400',
	reminders: []
});

export default currentListStore;
