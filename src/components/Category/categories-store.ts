export interface ICategory {
	title: string;
	backgroundColor: string;
	textColor: string;
}

export const categories: ICategory[] = [
	{
		title: 'Today',
		backgroundColor: 'bg-blue-400',
		textColor: 'text-blue-400'
	},
	{ title: 'Planned', backgroundColor: 'bg-red-400', textColor: 'text-white' },
	{
		title: 'All',
		backgroundColor: 'bg-gray-700',
		textColor: 'text-gray-700'
	},
	{ title: 'Marked', backgroundColor: 'bg-orange-400', textColor: 'text-white' },
	{
		title: 'Done',
		backgroundColor: 'bg-slate-600',
		textColor: 'text-slate-600'
	}
];
