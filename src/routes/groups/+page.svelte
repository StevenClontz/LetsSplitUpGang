<script lang="ts">
	import TextareaArray from "../../components/TextareaArray.svelte";
    import { Button } from 'spaper';
    import { groups } from "../../stores";
    let groupsStringArray:string[] = $groups.map(g=>g.name);
    $: $groups = groupsStringArray.map((s,i) => {
        if (i < $groups.length) {
            let p = $groups[i];
            p.name = s;
            return p
        } else {
            return {name: s}
        }
    })
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