<script lang="ts">
    import WorkingGroup from "../../components/WorkingGroup.svelte";
    import type { WorkingGroupT } from "../../types/workingGroup.type";
    let groups:WorkingGroupT[] = [];
    const addGroup = () => groups = [...groups, {name: 'Group Name'}];
    addGroup()
    const removeGroup = () => groups = groups.slice(0,-1);
</script>

<h3>What's going on?</h3>
<p>Everyone is allowed to propose a potential working group, added to the below list.</p>
<p>
    Groups:
    <button on:click={addGroup}>Add</button>
    <button on:click={removeGroup}>Remove</button>
</p>
{#each groups as group}
    <WorkingGroup {group}/>
{/each}
