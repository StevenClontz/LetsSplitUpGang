<script lang="ts">
	import TextareaArray from "../../components/TextareaArray.svelte";
    import type { GroupT } from "../../types/group.type";
    import { Button } from 'spaper';
    let groups:GroupT[] = [];
    let groupsStringArray:string[] = [];
    $: groups = groupsStringArray.map(s=>{return {name:s}})
</script>

<h3>What do we want to do?</h3>
<p>Create a list of potential working groups, one per line below.</p>
<p>
    <TextareaArray bind:value={groupsStringArray}/>
</p>
<p>
    <Button href="/groups/" type="primary">How many folks would do these?</Button>
    <Button href="/" outline="primary">Back to naming folks...</Button>
</p>