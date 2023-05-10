<script lang="ts">
	import type { IReminder } from "./Reminder";
	export let reminder: IReminder = {
		title: 'A reminder',
		isDone: false,
		assignedCategories: null,
		assignedLists: null,
		assignedTags: null,
		priority: null,
		notes: null
	}

	export let markAsDone: (title: string) => void
</script>

<div class="grid gap-2">
	<header
		class="flex cursor-pointer items-center gap-4"
		on:mousedown={markAsDone}
	>
		<span
			class="flex h-4 w-4 items-center justify-center rounded-full border">
			<span
				class="h-3 w-3 rounded-full bg-blue-400 transition-all {reminder.isDone ? 'scale-100' : 'scale-0'}"></span>
		</span>
		<div class="flex gap-1">
			{#if reminder.priority}<span>{reminder.priority}</span>{/if}
			<h2 class="{reminder.isDone ? 'text-gray-400 line-through' : 'opacity-100 text-gray-900'}">{reminder.title}</h2>
		</div>
	</header>

	{#if reminder.notes}
		<p class="pl-8 text-xs text-gray-400">
			{reminder.notes}
		</p>
	{/if}

	{#if reminder.assignedTags.length >= 1}
		<ul class="flex gap-2 pl-8">
			{#each reminder.assignedTags as assignedTag}
				<li class="rounded bg-gray-100 px-3 py-2 text-xs">#{assignedTag}</li>
			{/each}
		</ul>
	{/if}
</div>
