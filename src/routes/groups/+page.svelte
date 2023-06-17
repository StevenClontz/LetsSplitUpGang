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
            return {name: s, votes: 0, personNames: [], notes: ""}
        }
    })
</script>

<h3>What do we want to do?</h3>
<p>
    Create a list of potential working groups to sort your team into, one per line below.
    (Don't know what these should be? Try asking your team!)
</p>
<p>
    <TextareaArray bind:value={groupsStringArray}/>
</p>
<div class="row flex-edges">
    <div class="sm-6 col">
        <Button isLink href="/" outline="primary">&laquo; Oops, we forgot someone...</Button>
    </div>
    <div class="sm-6 col text-right">
        <Button isLink href="/votes" type="secondary" disabled={$groups.length<2}>Now for the popularity contest... &raquo;</Button>
    </div>
</div>
