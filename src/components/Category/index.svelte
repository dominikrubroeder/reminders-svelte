<script lang="ts">
    import type {ICategory} from "./categories-store";
    import currentListStore from "../CurrentList/current-list-store";
    import remindersStore from "../Reminder/reminders-store";
    import type {IReminder} from "../Reminder/reminders-store"

    export let category: ICategory = {
        backgroundColor: "bg-blue-400", textColor: "text-white", title: "A category"
    }

    let reminders: IReminder[] = []

    remindersStore.subscribe(state => reminders = state.filter(reminder => reminder.assignedCategories.includes(category.title)))

    function updateCurrentList() {
        currentListStore.update(() => {
            return {
                title: category.title,
                type: 'Category',
                textColor: category.textColor,
                backgroundColor: category.backgroundColor,
                reminders: reminders
            }
        })
    }
</script>

<div class="grid cursor-pointer gap-1 rounded-2xl p-4 bg-gray-200 transition-all"
     on:mousedown={updateCurrentList}>
    <div class="flex items-center justify-between gap-4">
        <span class="h-5 w-5 {category.backgroundColor} shrink-0 rounded-full"></span>
        <div>
            {reminders.length}
        </div>
    </div>

    <h2 class="font-bold">
        {category.title}
    </h2>
</div>
