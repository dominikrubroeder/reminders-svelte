<main class="flex overflow-hidden h-screen">
    <aside class="w-80 bg-gray-200 border-r h-full p-4">Sidebar</aside>
    <section class="flex-1 p-4 overflow-y-scroll overflow-x-hidden grid gap-8 justify-start content-start">
        <h1 class="text-3xl font-bold">List title</h1>

        <ul class="grid gap-4 max-w-screen-sm">
            {#each reminders as {title, isDone}, i (title + i)}
                <li>
                    <div class="flex gap-4 items-center">
                        <input type="checkbox" checked="{isDone}"
                               on:click={isDone ? false : !isDone ? true : true }/> {title}
                    </div>
                </li>
            {/each}
        </ul>

        <button on:click={addReminder}>Add reminder</button>
    </section>
</main>

<script lang="ts">
    interface Reminder {
        title: string
        isDone: boolean
    }

    let reminders: Reminder[] = [
        {
            title: 'A first reminder',
            isDone: false
        },
        {
            title: 'Second reminder',
            isDone: true
        }
    ]

    function addReminder() {
        reminders = [
            ...reminders,
            {
                title: 'Newly added reminder',
                isDone: false
            }
        ]
    }
</script>