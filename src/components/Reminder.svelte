<script lang="ts">
    export interface IReminder {
        title: string;
        isDone: boolean;
        assignedCategories: string[];
        assignedLists: string[];
        assignedTags: string[];
    }

    export let title: 'A reminder'
    export let isDone: false
    export let assignedCategories: []
    export let assignedLists: []
    export let assignedTags: []

    let isOpen = false
</script>

<div
        class="grid gap-2"
        on:mousedown={() => isOpen = !isOpen}
>
    <header class="flex cursor-pointer items-center gap-4 transition-all {isDone
		? 'line-through'
		: ''}">
		<span class="flex h-4 w-4 items-center justify-center rounded-full border" on:mousedown={() => markAsDone()}>
		<span
                class="h-3 w-3 rounded-full bg-blue-400 transition-all {isDone
				? 'scale-100'
				: 'scale-0'}"></span>
	</span>
        <h2 class={isDone ? 'opacity-30' : 'opacity-100'}>{title}</h2>
    </header>

    {#if isOpen}
        <div class="pl-8">
            Show isOpen content
        </div>
    {/if}
</div>
