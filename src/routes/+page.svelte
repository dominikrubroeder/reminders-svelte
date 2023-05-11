<script lang="ts">
	import type {IReminder} from "../components/Reminder/reminders-store";
	import remindersStore from "../components/Reminder/reminders-store";
	import Reminder from '../components/Reminder/index.svelte';
	import Toggle from "../components/Toggle.svelte";
	import type {IList} from "../components/List/lists-store";
	import listsStore from "../components/List/lists-store";
	import List from "../components/List/index.svelte";

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
        {title: 'Planned', backgroundColor: 'bg-red-400', textColor: 'text-white'},
        {
            title: 'All',
            backgroundColor: 'bg-gray-700',
            textColor: 'text-white'
        },
        {title: 'Marked', backgroundColor: 'bg-orange-400', textColor: 'text-white'},
        {
            title: 'Done',
            backgroundColor: 'bg-slate-600',
            textColor: 'text-white'
        }
    ];
    let reminders: IReminder[] = []
    let lists: IList[] = []
    let tags: string[] = []
    let priorities = ['!', '!!', '!!!']

    let searchValue = '';
    let activeList: ActiveList = {title: 'Today', type: 'Category'};

    export let hideDone = false

    function addReminder() {
        remindersStore.update(state => [
            ...state,
            {
                title: 'Newly added reminder',
                isDone: false,
                assignedCategories: ['All'],
                assignedLists: [],
                assignedTags: [],
                priority: null,
                notes: null,
            }
        ])
    }

    remindersStore.subscribe(state => {
        reminders = state
        tags = ['All tags', ...state.map(reminder => reminder.assignedTags).flat()]
    })

    listsStore.subscribe(state => lists = state)
</script>

<main class="flex h-screen overflow-hidden">
    <aside class="grid h-full w-80 content-start gap-8 border-r bg-gray-100 p-4">
        <section class="grid gap-4">
            <section>
                <input
                        bind:value={searchValue}
                        class="w-full rounded border bg-gray-200 px-3 py-1 text-sm"
                        placeholder="Search"
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
                        <List {list}/>
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
                <Toggle isActive={hideDone} onClick="{() => hideDone = !hideDone}"/>
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
                            <Reminder {reminder}/>
                            <hr class="ml-8 mt-4"/>
                        </li>
                    {/if}
                {/if}
            {/each}
        </ul>
    </section>
</main>
