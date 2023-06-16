<script lang="ts">
    import Person from "../components/Person.svelte";
    import type { PersonT } from "../types/person.type";
    let persons:PersonT[] = [];
    let editablePersonIndex:number|undefined;
    const addPerson = () => {
        persons = [...persons, {name:`Person ${persons.length+1}`}];
        editablePersonIndex = persons.length-1;
    }
    const savePerson = (index:number) => {
        editablePersonIndex = undefined;
        if (persons.length===index+1) {
            addPerson();
        }
    }
    const deletePerson = (index:number) => {
        persons = [...persons.slice(0,index),...persons.slice(index+1)];
        editablePersonIndex = undefined;
    }
    addPerson();
</script>

<h3>Who's here?</h3>
<p>List the people who will be working!</p>
{#each persons as person, i}
    <p>
        <Person {person}
            editable={i===editablePersonIndex}
            on:edit={()=>editablePersonIndex=i}
            on:save={()=>savePerson(i)}
            on:delete={()=>deletePerson(i)}/>
    </p>
{/each}
<p>
    <button on:click={addPerson}>Add another person</button>
</p>
<p>
    <a href="/groups">Now to form some groups...</a>
</p>