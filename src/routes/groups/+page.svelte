<script lang="ts">
	import TextareaArray from "../../components/TextareaArray.svelte";
    import BottomNav from "../../components/BottomNav.svelte";
    import BottomNavItem from "../../components/BottomNavItem.svelte";
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

<h3>We got some work to do now...</h3>
<p>
    List the tasks/topics to be tackled by each working group, one per line below.
    (Don't know what these should be? Try asking your team!)
</p>
<p>
    <TextareaArray bind:value={groupsStringArray}/>
</p>

<BottomNav>
    <BottomNavItem>
        <Button 
            isLink
            type="secondary"
            href={$groups.length<2?"#":"/votes"}
            disabled={$groups.length<2}>
            Don't hold back! &raquo;
        </Button>
    </BottomNavItem>
    <BottomNavItem>
        <Button isLink href="/" outline="primary">&laquo; Oops, we forgot someone...</Button>
    </BottomNavItem>
</BottomNav>
