<script lang="ts">
    export interface Reminder {
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

    export let markAsDone = () => void
</script>

<div
        class="flex cursor-pointer items-center gap-4 transition-all {isDone
		? 'line-through'
		: ''}"
        on:mousedown={() => markAsDone()}
>
	<span class="flex h-4 w-4 items-center justify-center rounded-full border">
		<span
                class="h-3 w-3 rounded-full bg-blue-400 transition-all {isDone
				? 'scale-100'
				: 'scale-0'}"></span>
	</span>
    <h2 class={isDone ? 'opacity-30' : 'opacity-100'}>{title}</h2>
</div>
