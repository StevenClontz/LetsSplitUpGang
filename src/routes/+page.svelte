<script lang="ts">
    import Person from "../components/Person.svelte";
    import type { PersonT } from "../types/person.type";
    let persons:PersonT[] = [];
    const addPerson = () => persons = [...persons, {name:'Person Name'}];
    addPerson()
    const removePerson = () => persons = persons.slice(0,-1);
</script>

<h3>Who's here?</h3>
<p>List the people who will be working!</p>
<p>
    People:
    <button on:click={addPerson}>Add</button>
    <button on:click={removePerson}>Remove</button>
</p>
{#each persons as person}
    <p><Person {person}/></p>
{/each}
