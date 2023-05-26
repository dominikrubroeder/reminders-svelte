<script lang="ts">
    import type {IReminder} from "./reminders-store";
    import remindersStore from "./reminders-store";
    import currentListStore from "../CurrentList/current-list-store";
    import {Icon, Trash, Pencil, Flag, Check} from "svelte-hero-icons";

    export let reminder: IReminder = {
        title: 'A reminder',
        isDone: false,
        isMarked: false,
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
    currentListStore.subscribe(state => activeTitle = state)

    function checkAsMarked() {
        isEditMode ? null : markAsDone(reminder.title)
    }

    function deleteReminder(reminderTitle: string) {
        remindersStore.update(state => [...state.filter(reminder => reminder.title !== reminderTitle)])
    }

    function flag(reminderTitle: string) {
        remindersStore.update((state) => {
            return state.map((currReminder) => {
                if (currReminder.title === reminderTitle) {
                    return {
                        ...currReminder,
                        isMarked: !currReminder.isMarked
                    };
                } else {
                    return currReminder;
                }
            })
        })
    }
</script>

<div class="grid gap-2">
    <header
            class="flex cursor-pointer items-center gap-4 z-40 relative"
    >
		<span
                class="flex h-4 w-4 items-center justify-center rounded-full border shrink-0"
                on:mousedown={() => markAsDone(reminder.title)}>
			<span
                    class="h-3 w-3 rounded-full bg-blue-400 transition-all {reminder.isDone ? 'scale-100' : 'scale-0'}"></span>
		</span>

        <div class="flex items-center justify-between gap-4 w-full"
             on:mousedown={checkAsMarked}>
            <div class="flex gap-1">
                {#if reminder.priority}
                    {#if isEditMode}
                        <select class="bg-none" bind:value={reminder.priority}>
                            <option value="!">!</option>
                            <option value="!!">!!</option>
                            <option value="!!!">!!!</option>
                        </select>
                    {:else if reminder.priority !== 'none'}
                        <span class="{activeTitle.textColor}">{reminder.priority}</span>
                    {/if}
                {/if}

                <div class="relative">
                    {#if isEditMode}
                        <input bind:value={reminder.title}
                               class="bg-transparent outline-none w-full {reminder.isDone ? 'line-through' : ''}"
                               use:autofocus/>
                    {:else}
                        <h2 class="{reminder.isDone ? 'text-gray-400 line-through' : 'opacity-100 text-gray-900'}">{reminder.title}</h2>
                    {/if}
                </div>
            </div>
        </div>

        <button class="flex items-center z-50" on:click={() => flag(reminder.title)}>
            <Icon src="{Flag}" size="16" class="{reminder.isMarked ? 'fill-amber-400' : 'fill-none'}"/>
        </button>

        <button class="flex items-center z-50" on:click={() => isEditMode = !isEditMode}>
            {#if isEditMode}
                <Icon src="{Check}" size="16"/>
            {:else}
                <Icon src="{Pencil}" size="16"/>
            {/if}
        </button>

        <button class="text-xs" on:click={() => deleteReminder(reminder.title)}>
            <Icon src="{Trash}" size="16" class="text-red-400"/>
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
                              on:mousedown={() => currentListStore.update(() => {return {title: assignedTag, type: 'Tag', backgroundColor: 'bg-blue-400', textColor: 'text-blue-400'}})}>#{assignedTag}</span>
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
