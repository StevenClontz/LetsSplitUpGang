<script lang="ts">
    import { Button, Badge, Collapsible, Input, Checkbox } from 'spaper';
    import fuzzysort from 'fuzzysort'
    import { groups, persons } from "../../stores";
    import { viableGroups } from '../../utils';
	import type { GroupT } from '../../types/group.type';
	import type { PersonT } from '../../types/person.type';
    import BottomNav from '../../components/BottomNav.svelte';
    import BottomNavItem from '../../components/BottomNavItem.svelte';  
    let openGroup = 0;
    let filterText = "";
    const searchResults = (ft:string,group:GroupT):PersonT[] => {
        const ps = $persons.filter((p)=>{
            return $groups.filter(g=>g.name!==group.name && g.personNames.includes(p.name)).length === 0
        })
        if (ft==="") {
            return ps
        } else {
            return fuzzysort.go(ft,ps,{key:"name"}).map(r=>r.obj)
        }
    }
    const resetDecisions = () => {
        $groups = $groups.map((g) => {
            g.personNames = [];
            return g;
        })
    }
</script>

<h3>Choices, choices...</h3>
<div class="row flex-edges padding-none">
    <div class="sm-10 col padding-none">
        <p>
            Starting with the group that recieved the least votes (but at least two),
            everyone simultaneously chooses whether to commit to working in that group, or
            waiting to participate in a more popular group.
        </p>
        <p>
            If enough people
            commit to the group, it runs — otherwise, they can join another group.
        </p>
    </div>
    <div class="sm-2 col text-right padding-none">
        <p>
            <Button on:click={resetDecisions} size="small" outline="danger">Reset all decisions.</Button>
        </p>
    </div>
</div>
{#each viableGroups($groups) as group, i}
    <Collapsible 
        label={`${group.name} (${group.votes} votes, ${group.personNames.length} members)`} 
        open={openGroup===i} 
        on:open={()=>openGroup=i}>
        <h3>
            {group.name}
            <Badge type="warning" rounded>{group.votes} votes</Badge>
            <Badge type={group.personNames.length>1?"success":"primary"} rounded>{group.personNames.length} members</Badge>
        </h3>
        <p>
            Members:
            {#each group.personNames as name}<Badge>{name}</Badge> {:else}(none){/each}
            </p>
        <p><Input placeholder="Filter people" bind:value={filterText} /></p>
        <fieldset class="form-group">
            {#each searchResults(filterText,group) as person}   
                <Checkbox 
                    label={person.name} 
                    checked={group?.personNames.includes(person.name)} 
                    value={person.name}
                    on:change={_=>$groups=$groups}
                    bind:group={group.personNames} />
            {:else}
                {#if filterText===""}
                    <p>Everyone has already decided on other groups!</p>
                {:else}
                    <p>No undecided names matching <code>{filterText}</code> were found.</p>
                {/if}
            {/each}
        </fieldset>
    </Collapsible>
{/each}


<BottomNav>
    <BottomNavItem>
        <Button isLink href="/summary" type="secondary">Let's get to work! &raquo;</Button>
    </BottomNavItem>
    <BottomNavItem>
        <Button isLink href="/votes" outline="primary">&laquo; Actually, time for a recount.</Button>
    </BottomNavItem>
</BottomNav>
