import { writable } from 'svelte/store';

const settingsStore = writable({
	hideDone: false
});

export default settingsStore;
