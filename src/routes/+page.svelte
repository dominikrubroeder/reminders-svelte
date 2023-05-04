<main class="flex overflow-hidden h-screen">
    <aside class="w-80 bg-gray-100 border-r h-full p-4">
        <ul class="grid gap-4">
            {#each lists as list}
                <li>
                    <div class="flex justify-between gap-4 items-center p-4 rounded-2xl cursor-pointer transition-all {list === activeList ? 'bg-gray-200' : 'bg-transparent'}"
                         on:mousedown={() => activeList = list}>
                        <h2 class="font-bold">{list}</h2>
                        <div>{reminders.filter(reminder => reminder.assignedLists.includes(list)).length}</div>
                    </div>
                </li>
            {/each}
        </ul>
    </aside>

    <section class="flex-1 p-4 overflow-y-scroll overflow-x-hidden grid gap-8 justify-start content-start">
        <header>
            <button on:click={addReminder}>+</button>
        </header>

        <h1 class="text-3xl font-bold">{activeList}</h1>

        <ul class="grid gap-4 max-w-screen-sm">
            {#each reminders as {title, isDone, assignedLists}, i (title + i)}
                {#if assignedLists.includes(activeList)}
                    <li>
                        <div class="flex gap-4 items-center cursor-pointer transition-all {isDone ? 'line-through' : ''}"
                             on:mousedown={() => markAsDone(title)}>
                            <span class="h-4 w-4 flex items-center justify-center rounded-full border">
                                <span class="h-3 w-3 bg-blue-400 rounded-full transition-all {isDone ? 'scale-100' : 'scale-0'}"></span>
                            </span>
                            <h2 class="{isDone ? 'opacity-30' : 'opacity-100'}"> {title}</h2>
                        </div>
                    </li>
                {/if}
            {/each}
        </ul>
    </section>
</main>

<script lang="ts">
    interface Reminder {
        title: string
        isDone: boolean
        assignedLists: string[]
    }

    let lists = ['Today', 'Planned', 'All', 'Marked', 'Done']

    let activeList = 'Today'

    let reminders: Reminder[] = [
        {
            title: 'A first reminder',
            isDone: false,
            assignedLists: ['Today', 'All']
        },
        {
            title: 'Second reminder',
            isDone: true,
            assignedLists: ['Today', 'All', "Done"]
        }
    ]

    function addReminder() {
        reminders = [
            ...reminders,
            {
                title: 'Newly added reminder',
                isDone: false,
                assignedLists: ['Today', 'All']
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