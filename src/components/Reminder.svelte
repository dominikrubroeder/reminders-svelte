<script lang="ts">
	export interface IReminder {
		title: string;
		isDone: boolean;
		assignedCategories: string[];
		assignedLists: string[];
		assignedTags: string[];
		priority: null | '!' | '!!' | '!!!';
		notes: string;
	}

	export let title = 'A reminder';
	export let isDone = false;
	export let assignedCategories = [];
	export let assignedLists = [];
	export let assignedTags = [];
	export let priority = null
	export let notes = null

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
				class="h-3 w-3 rounded-full bg-blue-400 transition-all {isDone ? 'scale-100' : 'scale-0'}"></span>
		</span>
		<div class="flex gap-1">
			{#if priority}<span>{priority}</span>{/if}
			<h2 class="{isDone ? 'text-gray-400 line-through' : 'opacity-100 text-gray-900'}">{title}</h2>
		</div>
	</header>

	{#if assignedTags.length >= 1}
		<p class="pl-8 text-xs text-gray-400">
			{#if notes}<p>{notes}</p>{/if}
		</p>
	{/if}

	{#if assignedTags.length >= 1}
		<ul class="flex gap-2 pl-8">
			{#each assignedTags as assignedTag}
				<li class="rounded bg-gray-100 px-3 py-2 text-xs">#{assignedTag}</li>
			{/each}
		</ul>
	{/if}
</div>
