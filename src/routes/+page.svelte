<script lang="ts">
    import type {IReminder} from "../components/Reminder/reminders-store";
    import remindersStore from "../components/Reminder/reminders-store";
    import Reminder from '../components/Reminder/index.svelte';
    import type {IList} from "../components/List/lists-store";
    import listsStore from "../components/List/lists-store";
    import List from "../components/List/index.svelte";
    import {categories} from "../components/Category/categories-store";
    import Category from "../components/Category/index.svelte";
    import {priorities} from "../components/Priority/priorities-store";
    import Header from "../components/Header/index.svelte";
    import type {IActiveTitle} from "../components/Header/ActiveTitle/active-title-store";
    import activeTitleStore from "../components/Header/ActiveTitle/active-title-store";
    import settingsStore from "../components/Settings/settings-store";

    let reminders: IReminder[] = []
    let lists: IList[] = []
    let tags: string[] = []
    let activeTitle: IActiveTitle
    let hideDone: boolean

    let searchValue = '';

    remindersStore.subscribe(state => {
        reminders = state
        tags = ['All tags', ...state.map(reminder => reminder.assignedTags).flat()]
    })
    listsStore.subscribe(state => lists = state)
    activeTitleStore.subscribe(state => activeTitle = state)
    settingsStore.subscribe(state => hideDone = state.hideDone)
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
                            <Category {category}/>
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
                        <div class="cursor-pointer rounded px-2.5 py-1.5 text-sm {tag === activeTitle.title ? 'text-white bg-blue-400' : 'bg-gray-200'}"
                             on:mousedown={() => activeTitleStore.update(() => {return { title: tag, type: 'Tag' }})}
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
                                class="cursor-pointer rounded px-2.5 py-1.5 text-sm {priority === activeTitle.title
								? 'text-white bg-blue-400'
								: 'bg-gray-200'}"
                                on:mousedown={() => activeTitleStore.update(() => {return { title: priority, type: 'Priority' }})}

                        >
                            {priority}
                        </div>
                    </li>
                {/each}
            </ul>
        </section>
    </aside>

    <section class="grid flex-1 content-start gap-8 overflow-x-hidden overflow-y-scroll p-4">
        <Header/>


        <ul class="grid gap-4">
            {#each reminders as reminder, i (reminder.title + i)}
                {#if (reminder.assignedCategories.includes(activeTitle.title) || reminder.assignedLists.includes(activeTitle.title) || reminder.assignedTags.includes(activeTitle.title)) || reminder.priority === activeTitle.title && reminder.title.includes(searchValue)}
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
