export interface IReminder {
	title: string;
	isDone: boolean;
	assignedCategories: null | string[];
	assignedLists: null | string[];
	assignedTags: null | string[];
	priority: null | '!' | '!!' | '!!!';
	notes: null | string;
}
