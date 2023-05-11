<script lang="ts">
    export let onClick = null
    export let isActive = false

    function onClickHandler() {
        if (onClick) onClick()
    }
</script>

<div class="rounded-full inline-block w-10 p-1 cursor-pointer {isActive ? 'bg-amber-400' : 'bg-gray-100'}"
     on:mousedown={onClickHandler}>
    <span class="h-4 w-4 rounded-full block bg-white transition-all {isActive ? 'translate-x-full' : 'translate-x-0'}"></span>
</div>
