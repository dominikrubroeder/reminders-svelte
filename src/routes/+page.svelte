<main class="flex overflow-hidden h-screen">
    <aside class="w-80 bg-gray-100 border-r h-full p-4 grid gap-4 content-start">

        <section>
            <input placeholder="Search" bind:value="{searchValue}"
                   class="w-full rounded border bg-gray-200 py-1 px-3 text-sm"/>
        </section>

        <section>
            <ul class="grid grid-cols-2 gap-2">
                {#each categories as category}
                    <li>
                        <div class="grid gap-1 p-4 rounded-2xl cursor-pointer transition-all {category.title === activeList.title ? 'bg-blue-400' : 'bg-gray-200'}"
                             on:mousedown={() => activeList = {title: category.title, type: 'Category'}}>
                            <div class="flex justify-between gap-4 items-center">
                                <span class="h-5 w-5 {category.backgroundColor} rounded-full shrink-0"></span>
                                <div>{reminders.filter(reminder => reminder.assignedLists.includes(category)).length}</div>
                            </div>
                            <h2 class="font-bold">{category.title}</h2>
                        </div>
                    </li>
                {/each}
            </ul>
        </section>

        <section class="grid gap-2">
            <h2 class="text-xs">Meine Listen</h2>
            <ul class="grid">
                {#each lists as list}
                    <li>
                        <div class="flex justify-between gap-4 items-center p-4 rounded-2xl cursor-pointer transition-all {list.title === activeList.title ? 'bg-gray-200' : 'bg-transparent'}"
                             on:mousedown={() => activeList = {title: list.title, type: 'List'}}>
                            <div class="flex items-center gap-2">
                                <span class="h-5 w-5 rounded-full shrink-0 {list.backgroundColor} {list.textColor}"></span>
                                <h2 class="font-bold flex-1">{list.title}</h2>
                            </div>
                            <div>{reminders.filter(reminder => reminder.assignedLists.includes(list)).length}</div>
                        </div>
                    </li>
                {/each}
            </ul>
        </section>

        <section class="grid gap-2">
            <h2 class="text-xs">Tags</h2>
            <ul class="flex gap-1">
                {#each tags as tag}
                    <li>
                        <div class="py-1.5 px-2.5 rounded cursor-pointer text-sm transition-all {tag.title === activeList.title ? 'bg-blue-400' : 'bg-gray-200'}"
                             on:mousedown={() => activeList = {title: tag, type: 'Tag'}}>
                            {tag}
                        </div>
                    </li>
                {/each}
            </ul>
        </section>
    </aside>

    <section class="flex-1 p-4 overflow-y-scroll overflow-x-hidden grid gap-8 content-start">
        <header>
            <button on:click={addReminder}>+</button>
        </header>

        <h1 class="text-3xl font-bold">{activeList.title}</h1>

        <ul class="grid gap-4">
            {#each reminders as {title, isDone, assignedCategories, assignedLists, assignedTags}, i (title + i)}
                {#if assignedCategories.includes(activeList.title) || assignedLists.includes(activeList.title) || assignedTags.includes(activeList.title) && title.includes(searchValue)}
                    <li>
                        <div class="flex gap-4 items-center cursor-pointer transition-all {isDone ? 'line-through' : ''}"
                             on:mousedown={() => markAsDone(title)}>
                            <span class="h-4 w-4 flex items-center justify-center rounded-full border">
                                <span class="h-3 w-3 bg-blue-400 rounded-full transition-all {isDone ? 'scale-100' : 'scale-0'}"></span>
                            </span>
                            <h2 class="{isDone ? 'opacity-30' : 'opacity-100'}"> {title}</h2>
                        </div>

                        <hr class="ml-8 mt-4"/>
                    </li>
                {/if}
            {/each}
        </ul>
    </section>
</main>

<script lang="ts">
    interface Reminder {
        title: string
        isDone: boolean,
        assignedCategories: string[],
        assignedLists: string[],
        assignedTags: string[]
    }

    interface List {
        title: string,
        backgroundColor: string,
        textColor: string
    }

    interface Category {
        title: string,
        backgroundColor: string,
        textColor: string
    }

    interface ActiveList {
        title: string,
        type: 'List' | 'Tag' | 'Category'
    }

    let categories: Category[] = [{
        title: 'Today',
        backgroundColor: 'bg-blue-400',
        textColor: 'text-white'
    }, {title: 'Planned', backgroundColor: 'bg-red-400', textColor: 'text-white'}, {
        title: 'All',
        backgroundColor: 'bg-gray-700',
        textColor: 'text-white'
    }, {title: 'Marked', backgroundColor: 'bg-orange-400', textColor: 'text-white'}, {
        title: 'Done',
        backgroundColor: 'bg-slate-600',
        textColor: 'text-white'
    }]

    let lists: List[] = [{
        title: 'Reminders',
        backgroundColor: 'bg-red-400',
        textColor: 'text-white'
    }, {title: 'Another list', backgroundColor: 'bg-red-400', textColor: 'text-white'}]

    let tags = ['All tags']

    let activeList: ActiveList = {title: 'Reminders', type: 'List'}
    let searchValue = ""

    let reminders: Reminder[] = [
        {
            title: 'A first reminder',
            isDone: false,
            assignedCategories: ['All'],
            assignedLists: [],
            assignedTags: []
        },
        {
            title: 'Second reminder',
            isDone: true,
            assignedCategories: ['All'],
            assignedLists: [],
            assignedTags: []
        }
    ]

    function addReminder() {
        reminders = [
            ...reminders,
            {
                title: 'Newly added reminder',
                isDone: false,
                assignedCategories: ['All'],
                assignedLists: [],
                assignedTags: []
            }
        ]
    }

    function markAsDone(reminderTitle: string) {
        reminders = reminders.map(currReminder => {
            if (currReminder.title === reminderTitle) {
                return {
                    ...currReminder,
                    isDone: !currReminder.isDone
                }
            } else {
                return currReminder
            }
        })
    }
</script>