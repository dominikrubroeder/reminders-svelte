<script lang="ts">
    import Toggle from "../Toggle.svelte";
    import remindersStore from "../Reminder/reminders-store";
    import activeTitleStore from "./ActiveTitle/active-title-store";

    let activeTitle;

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

    activeTitleStore.subscribe(state => activeTitle = state)
</script>

<header class="grid gap-2">
    <div class="flex gap-4 items-center justify-between flex-wrap">
        <button on:click={addReminder}>+</button>
        <div class="flex gap-2 items-center text-xs">
            Hide done
            <Toggle isActive={hideDone} onClick="{() => hideDone = !hideDone}"/>
        </div>
    </div>

    <h1 class="text-3xl font-bold flex gap-0">
        {activeTitle.type === 'Tag' ? '#' : ''}
        {activeTitle.title}
    </h1>
</header>
