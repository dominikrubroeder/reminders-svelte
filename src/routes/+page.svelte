<script lang="ts">
	import Reminder from '../components/Reminder/index.svelte';
	import type {IReminder} from "../components/Reminder/Reminder";
	import Toggle from "../components/Toggle.svelte";

	interface List {
		title: string;
		backgroundColor: string;
		textColor: string;
	}

	interface Category {
		title: string;
		backgroundColor: string;
		textColor: string;
	}

	interface ActiveList {
		title: string;
		type: 'List' | 'Tag' | 'Category' | 'Priority';
	}

	let categories: Category[] = [
		{
			title: 'Today',
			backgroundColor: 'bg-blue-400',
			textColor: 'text-white'
		},
		{ title: 'Planned', backgroundColor: 'bg-red-400', textColor: 'text-white' },
		{
			title: 'All',
			backgroundColor: 'bg-gray-700',
			textColor: 'text-white'
		},
		{ title: 'Marked', backgroundColor: 'bg-orange-400', textColor: 'text-white' },
		{
			title: 'Done',
			backgroundColor: 'bg-slate-600',
			textColor: 'text-white'
		}
	];

	let lists: List[] = [
		{
			title: 'Reminders',
			backgroundColor: 'bg-red-400',
			textColor: 'text-white'
		},
		{ title: 'Another list', backgroundColor: 'bg-red-400', textColor: 'text-white' }
	];

	let priorities = ['!', '!!', '!!!']

	let activeList: ActiveList = { title: 'Today', type: 'Category' };
	let searchValue = '';

	let reminders: IReminder[] = [
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
	];

	$: tags = ['All tags', ...reminders.map(reminder => reminder.assignedTags).flat()]

	export let hideDone = false

	function addReminder() {
		reminders = [
			...reminders,
			{
				title: 'Newly added reminder',
				isDone: false,
				assignedCategories: ['All'],
				assignedLists: [],
				assignedTags: [],
				priority: null,
				notes: null,
			}
		];
	}

	function markAsDone(reminderTitle: string) {
		reminders = reminders.map((currReminder) => {
			if (currReminder.title === reminderTitle) {
				return {
					...currReminder,
					isDone: !currReminder.isDone
				};
			} else {
				return currReminder;
			}
		});
	}
</script>

<main class="flex h-screen overflow-hidden">
	<aside class="grid h-full w-80 content-start gap-8 border-r bg-gray-100 p-4">
		<section class="grid gap-4">
			<section>
				<input
						placeholder="Search"
						bind:value={searchValue}
						class="w-full rounded border bg-gray-200 px-3 py-1 text-sm"
				/>
			</section>

			<section>
				<ul class="grid grid-cols-2 gap-2">
					{#each categories as category}
						<li>
							<div
									class="grid cursor-pointer gap-1 rounded-2xl p-4 transition-all {category.title ===
							activeList.title
								? category.backgroundColor
								: 'bg-gray-200'}"
									on:mousedown={() => (activeList = { title: category.title, type: 'Category' })}
							>
								<div class="flex items-center justify-between gap-4">
								<span
										class="h-5 w-5 {category.title === activeList.title
										? 'bg-white'
										: category.backgroundColor} shrink-0 rounded-full"></span>
									<div class={category.title === activeList.title ? 'text-white' : ''}>
										{reminders.filter((reminder) => reminder.assignedLists.includes(category)).length}
									</div>
								</div>
								<h2 class="font-bold {category.title === activeList.title ? 'text-white' : ''}">
									{category.title}
								</h2>
							</div>
						</li>
					{/each}
				</ul>
			</section>
		</section>

		<section class="grid gap-2">
			<h2 class="text-xs">Meine Listen</h2>
			<ul class="grid">
				{#each lists as list}
					<li>
						<div
							class="flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-4 py-3 {list.title ===
							activeList.title
								? 'bg-gray-200'
								: 'bg-transparent'}"
							on:mousedown={() => (activeList = { title: list.title, type: 'List' })}
						>
							<div class="flex items-center gap-2">
								<span
									class="h-5 w-5 shrink-0 rounded-full {list.backgroundColor} {list.textColor}"></span>
								<h2 class="flex-1 font-bold">{list.title}</h2>
							</div>
							<div>
								{reminders.filter((reminder) => reminder.assignedLists.includes(list)).length}
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</section>

		<section class="grid gap-2">
			<h2 class="text-xs">Tags</h2>
			<ul class="flex gap-1 flex-wrap">
				{#each tags as tag}
					<li>
						<div
							class="cursor-pointer rounded px-2.5 py-1.5 text-sm {tag.title === activeList.title
								? 'bg-blue-400'
								: 'bg-gray-200'}"
							on:mousedown={() => (activeList = { title: tag, type: 'Tag' })}
						>
							{tag}
						</div>
					</li>
				{/each}
			</ul>
		</section>

		<section class="grid gap-2">
			<h2 class="text-xs">Priority</h2>

			<ul class="flex gap-1 flex-wrap">
				{#each priorities as priority}
					<li>
						<div
								class="cursor-pointer rounded px-2.5 py-1.5 text-sm {priority === activeList.title
								? 'bg-blue-400'
								: 'bg-gray-200'}"
								on:mousedown={() => (activeList = { title: priority, type: 'Priority' })}

						>
							{priority}
						</div>
					</li>
				{/each}
			</ul>
		</section>
	</aside>

	<section class="grid flex-1 content-start gap-8 overflow-x-hidden overflow-y-scroll p-4">
		<header class="flex gap-4 items-center justify-between flex-wrap">
			<button on:click={addReminder}>+</button>
			<div class="flex gap-2 items-center text-xs">
				Hide done
				<Toggle onClick="{() => hideDone = !hideDone}" isActive={hideDone} />
			</div>
		</header>

		<h1 class="text-3xl font-bold flex gap-0">
			{activeList.type === 'Tag' ? '#' : ''}
			{activeList.title}
		</h1>

		<ul class="grid gap-4">
			{#each reminders as reminder, i (reminder.title + i)}
				{#if (reminder.assignedCategories.includes(activeList.title) || reminder.assignedLists.includes(activeList.title) || reminder.assignedTags.includes(activeList.title)) || reminder.priority === activeList.title && reminder.title.includes(searchValue)}
					{#if !(reminder.isDone && hideDone)}
						<li>
							<Reminder {reminder} markAsDone="{() => markAsDone(reminder.title)}" />
							<hr class="ml-8 mt-4" />
						</li>
					{/if}
				{/if}
			{/each}
		</ul>
	</section>
</main>
