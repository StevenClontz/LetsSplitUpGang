<script lang="ts">
    import type { WorkingGroupT } from "../types/workingGroup.type";
    import type { PersonT } from "../types/person.type";
    export let group:WorkingGroupT;
    export let editable = true;
</script>

{#if editable}
    <input bind:value={group.name}/>
{:else}
    {group.name}
{/if}

