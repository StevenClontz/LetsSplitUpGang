<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import type { PersonT } from "../types/person.type";
    export let person:PersonT;
    export let editable = true;
	const dispatch = createEventDispatcher();
</script>

{#if editable}
    <form on:submit={()=>dispatch('save')}>
        <input bind:value={person.name} autofocus/>
        <input type="submit" value="Save"/>
        <button on:click={()=>dispatch('delete')}>Delete</button>
    </form>
{:else}
    {person.name}
    <button on:click={()=>dispatch('edit')}>Edit</button>
{/if}
