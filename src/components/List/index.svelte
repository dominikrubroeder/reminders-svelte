<script lang="ts">
    import type {IList} from './lists-store';

    export let list: IList = {
        title: 'A list',
        backgroundColor: 'bg-red-400',
        textColor: 'text-white'
    };
</script>

<div
        class="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-gray-200 bg-transparent px-4 py-3"
>
    <div class="flex items-center gap-2">
        <span class="h-5 w-5 shrink-0 rounded-full {list.backgroundColor} {list.textColor}"></span>
        <h2 class="flex-1 font-bold">{list.title}</h2>
    </div>
    <div>0</div>
</div>
