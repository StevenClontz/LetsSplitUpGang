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

<h3>Who are you?</h3>
<p>List the names to be sorted into working groups, one per line below.</p>
<p>
    <TextareaArray bind:value={personsStringArray}/>
</p>

<BottomNav>
    <BottomNavItem>
        <Button isLink 
            type="secondary" 
            href={$persons.length<2?"#":"/groups"} 
            disabled={$persons.length<2}>
            We got some work to do now... &raquo;
        </Button>
    </BottomNavItem>
    <BottomNavItem>
        <Button isLink 
            href="/about"
            outline="primary">
            What, what?
        </Button>
    </BottomNavItem>
</BottomNav>
