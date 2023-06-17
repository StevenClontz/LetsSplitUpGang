<script lang="ts">
	import TextareaArray from "../components/TextareaArray.svelte";
    import type { PersonT } from "../types/person.type";
    import { Button } from 'spaper';
    let persons:PersonT[] = [];
    let personsStringArray:string[] = [];
    $: persons = personsStringArray.map(s=>{return {name:s}})
</script>

<h3>Who's here?</h3>
<p>List the people who will be working, one per line below.</p>
<p>
    <TextareaArray bind:value={personsStringArray}/>
</p>
<p>
    <Button href="/groups/" type="primary">Now to form some groups...</Button>
</p>