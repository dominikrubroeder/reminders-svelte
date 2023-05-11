<script lang="ts">
    import Toggle from "../Toggle.svelte";
    import settingsStore from "./settings-store";

    let hideDone

    settingsStore.subscribe(state => hideDone = state.hideDone)
</script>

<div class="flex gap-2 items-center text-xs">
    Hide done
    <Toggle isActive={hideDone}
            onClick="{() => settingsStore.update(state => {return {...state, hideDone: !state.hideDone}})}"/>
</div>
