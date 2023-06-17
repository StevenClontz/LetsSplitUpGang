<script lang="ts">
	import TextareaArray from "../components/TextareaArray.svelte";
    import { Button, Breadcrumb } from 'spaper';
    import { persons } from "../stores";
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
</script>

<h3>Who's here?</h3>
<p>List the people who will be working, one per line below.</p>
<p>
    <TextareaArray bind:value={personsStringArray}/>
</p>
<p>
    <Button href="/groups" type="secondary" disabled={$persons.length<2}>Let's form some groups...</Button>
</p>