<script lang="ts">
	import TextareaArray from "../components/TextareaArray.svelte";
    import BottomNav from "../components/BottomNav.svelte";
    import BottomNavItem from "../components/BottomNavItem.svelte";
    import { Button } from 'spaper';
    import { persons, groups } from "../stores";
    let personsStringArray:string[] = $persons.map(p=>p.name);
    $: $persons = personsStringArray.map((s,i) => {
        if (i < $persons.length) {
            let p = $persons[i];
            p.name = s;
            return p
        } else {
            return {name: s}
        }
    })
    $: $groups = $groups.map(g=>{
        g.personNames=g.personNames.filter(n=>$persons.map(p=>p.name).includes(n))
        return g
    })
</script>

<h3>Who's here?</h3>
<p>List the names for your team of people who need to be sorted into working groups, one per line below.</p>
<p>
    <TextareaArray bind:value={personsStringArray}/>
</p>

<BottomNav>
    <BottomNavItem>
        <Button isLink 
            href={$persons.length<2?"#":"/groups"} 
            type="secondary" 
            disabled={$persons.length<2}>
            And those groups are... &raquo;
        </Button>
    </BottomNavItem>
    <BottomNavItem>
        <Button isLink href="/about" outline="primary">What, what?</Button>
    </BottomNavItem>
</BottomNav>
