<script lang="ts">
    import activeTitleStore from "./Header/ActiveTitle/active-title-store";
    import type {IActiveTitle} from "./Header/ActiveTitle/active-title-store";

    export let onClick = null
    export let isActive = false

    function onClickHandler() {
        if (onClick) onClick()
    }

    let activeTitle: IActiveTitle
    activeTitleStore.subscribe(state => activeTitle = state)
</script>

<div class="rounded-full inline-block w-10 p-1 cursor-pointer {isActive ? `${activeTitle.backgroundColor}` : 'bg-gray-100'}"
     on:mousedown={onClickHandler}>
    <span class="h-4 w-4 rounded-full block bg-white transition-all {isActive ? 'translate-x-full' : 'translate-x-0'}"></span>
</div>
