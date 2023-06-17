<script lang="ts">
    import { Button, Badge, Collapsible, Input, Checkbox } from 'spaper';
    import fuzzysort from 'fuzzysort'
    import { groups, persons } from "../../stores";
    import { viableGroups } from '../../utils';
	import type { GroupT } from '../../types/group.type';
	import type { PersonT } from '../../types/person.type';
    let openGroup = 0;
    let filterText = "";
    const searchResults = (ft:string):PersonT[] => {
        if (ft==="") {
            return $persons
        } else {
            return fuzzysort.go(ft,$persons,{key:"name"}).map(r=>r.obj)
        }
    }
</script>

<h3>Choices, choices...</h3>
<p>
    Starting with the group that recieved the least votes (but at least two),
    everyone simultaneously chooses whether to commit to working in that group, or
    waiting to participate in a more popular group.
</p>
<p>
    If enough people
    commit to the group, it runs — otherwise, they can join another group.
</p>
{#each viableGroups($groups) as group, i}
    <Collapsible 
        label={`${group.name} (${group.votes} votes)`} 
        open={openGroup===i} 
        on:open={()=>openGroup=i}>
        <h3>
            {group.name}
            <Badge type="warning" rounded>{group.votes} votes</Badge>
            <Badge type="success" rounded>{group.personNames.length} members</Badge>
        </h3>
        <p>Members: {#each group.personNames as name}<Badge>{name}</Badge> {/each}</p>
        <p><Input placeholder="Filter people" bind:value={filterText} /></p>
        <fieldset class="form-group" style="max-height:6em;overflow-y:scroll">
            {#each searchResults(filterText) as person}   
                <Checkbox 
                    label={person.name} 
                    checked={group?.personNames.includes(person.name)} 
                    value={person.name}
                    on:change={_=>$groups=$groups}
                    bind:group={group.personNames} />
            {:else}
                <p>No names matching <code>{filterText}</code> were found.</p>
            {/each}
        </fieldset>
    </Collapsible>
{/each}
<div class="row flex-edges">
    <div class="sm-6 col">
        <Button isLink href="/votes" outline="primary">&laquo; Actually, time for a recount.</Button>
    </div>
    <div class="sm-6 col text-right">
        <Button isLink href="/locations" type="secondary">Where are we meeting? &raquo;</Button>
    </div>
</div>