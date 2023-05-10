<script lang="ts">
    export let hideDone = false
</script>

<div class="rounded-full inline-block w-10 p-1 {hideDone ? 'bg-gray-100' : 'bg-amber-400'}" on:mousedown={() => hideDone = !hideDone}>
    <span class="h-4 w-4 rounded-full block cursor-pointer bg-white transition-all {hideDone ? 'translate-x-0' : 'translate-x-full'}"></span>
</div>
