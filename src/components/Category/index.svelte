<script lang="ts">
    import type {ICategory} from "./categories-store";
    import activeTitleStore from "../Header/ActiveTitle/active-title-store";

    export let category: ICategory = {
        backgroundColor: "bg-blue-400", textColor: "text-white", title: "A category"
    }
</script>

<div class="grid cursor-pointer gap-1 rounded-2xl p-4 bg-gray-200 transition-all"
     on:mousedown={() => activeTitleStore.update(() => {return {title: category.title, type: 'Category'}})}>
    <div class="flex items-center justify-between gap-4">
        <span class="h-5 w-5 {category.backgroundColor} shrink-0 rounded-full"></span>
        <div>
            0
        </div>
    </div>

    <h2 class="font-bold">
        {category.title}
    </h2>
</div>
