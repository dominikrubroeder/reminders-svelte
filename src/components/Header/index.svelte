<script lang="ts">
    import remindersStore from "../Reminder/reminders-store";
    import currentListStore from "../CurrentList/current-list-store";
    import HideDone from "../Settings/HideDone.svelte";

    let activeTitle;

    function addReminder() {
        remindersStore.update(state => [
            ...state,
            {
                title: 'Newly added reminder',
                isDone: false,
                isMarked: false,
                assignedCategories: ['All'],
                assignedLists: [],
                assignedTags: [],
                priority: 'none',
                notes: '',
                url: ''
            }
        ])
    }

    currentListStore.subscribe(state => activeTitle = state)
</script>

<header class="grid gap-2">
    <div class="flex gap-4 items-center justify-between flex-wrap">
        <button on:click={addReminder}>+</button>
        <HideDone/>
    </div>

    <h1 class="text-3xl font-bold flex gap-0 {activeTitle.textColor}">
        {activeTitle.type === 'Tag' ? '#' : ''}
        {activeTitle.title}
    </h1>
</header>
