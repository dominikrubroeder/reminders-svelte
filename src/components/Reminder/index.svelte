<script lang="ts">
    import type {IReminder} from "./reminders-store";
    import remindersStore from "./reminders-store";
    import activeTitleStore from "../Header/ActiveTitle/active-title-store";

    export let reminder: IReminder = {
        title: 'A reminder',
        isDone: false,
        assignedCategories: [],
        assignedLists: [],
        assignedTags: [],
        priority: 'none',
        notes: '',
        url: ''
    }

    let isEditMode = false
    let newTag = ""

    function markAsDone(reminderTitle: string) {
        remindersStore.update((state) => {
            return state.map((currReminder) => {
                if (currReminder.title === reminderTitle) {
                    return {
                        ...currReminder,
                        isDone: !currReminder.isDone
                    };
                } else {
                    return currReminder;
                }
            })
        })
    }

    function autofocus(input) {
        input.focus()
    }

    let activeTitle
    activeTitleStore.subscribe(state => activeTitle = state)
</script>

<div class="grid gap-2">
    <header
            class="flex cursor-pointer items-center gap-4 z-40 relative"
            on:mousedown={() => markAsDone(reminder.title)}
    >
		<span
                class="flex h-4 w-4 items-center justify-center rounded-full border">
			<span
                    class="h-3 w-3 rounded-full bg-blue-400 transition-all {reminder.isDone ? 'scale-100' : 'scale-0'}"></span>
		</span>

        <div class="flex items-center justify-between gap-4 w-full">
            <div class="flex gap-1">
                {#if reminder.priority}
                    {#if isEditMode}
                        <select class="bg-none">
                            <option value="!">!</option>
                            <option value="!!">!!</option>
                            <option value="!!!">!!!</option>
                        </select>
                    {:else}
                        <span>{reminder.priority}</span>
                    {/if}
                {/if}

                <div class="relative">
                    {#if isEditMode}
                        <input bind:value={reminder.title}
                               class="bg-transparent outline-none w-full line-through"
                               use:autofocus/>
                    {:else}
                        <h2 class="{reminder.isDone ? 'text-gray-400 line-through' : 'opacity-100 text-gray-900'}">{reminder.title}</h2>
                    {/if}
                </div>
            </div>
        </div>

        <button class="flex items-center z-50" on:click={() => isEditMode = !isEditMode}>
            {#if isEditMode}
                <span class="text-xs">Done</span>
            {:else}
                <span>...</span>
            {/if}
        </button>
    </header>

    <div class="grid gap-0">
        <div class="pl-8 text-xs">
            {#if isEditMode}
                <input bind:value={reminder.url} placeholder="Add URL..."/>
            {:else if reminder.url !== ''}
                <a href="{reminder.url}" target="_blank" class="{activeTitle.textColor}">{reminder.url}</a>
            {/if}
        </div>

        <div class="pl-8 text-xs text-gray-400">
            {#if isEditMode}
                <p>
                    <input bind:value={reminder.notes} placeholder="Add notes..."/>
                </p>
            {:else}
                <p>
                    {reminder.notes}
                </p>
            {/if}
        </div>
    </div>

    {#if reminder.assignedTags.length >= 1}
        <ul class="flex gap-2 pl-8 flex-wrap items-center">
            {#each reminder.assignedTags as assignedTag}
                <li class="rounded bg-gray-100 text-xs">
                    {#if isEditMode}
                        <input bind:value={assignedTag} class="w-auto bg-transparent px-3 py-2"/>
                    {:else}
                        <span class="block px-3 py-2 cursor-pointer transition hover:bg-gray-200"
                              on:mousedown={() => activeTitleStore.update(() => {return {title: assignedTag, type: 'Tag', backgroundColor: 'bg-blue-400', textColor: 'text-blue-400'}})}>#{assignedTag}</span>
                    {/if}
                </li>
            {/each}

            {#if isEditMode}
                <li class="text-xs">
                    <form on:submit|preventDefault={() => {
						reminder.assignedTags = [...reminder.assignedTags, newTag.replaceAll(' ', '')]
						newTag = ""
					}}>
                        <input placeholder="Add Tag" bind:value={newTag} class="px-3 py-2"/>
                    </form>
                </li>
            {/if}
        </ul>
    {/if}
</div>
