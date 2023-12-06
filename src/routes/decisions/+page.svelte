<script lang="ts">
    import { Button, Badge, Collapsible, Input, Checkbox } from 'spaper';
    import fuzzysort from 'fuzzysort';
    import { groups, persons } from "../../stores";
    import BottomNav from '../../components/BottomNav.svelte';
    import BottomNavItem from '../../components/BottomNavItem.svelte';  
	import { viable, decided } from '../../utils';


    let openGroupIndex = 0;
    let filterText = "";
    const toggleGroup = (groupIndex:number) => {
        openGroupIndex = groupIndex;
        filterText = "";
    }

    $: viableGroups = $groups.filter(g=>viable(g)).sort((a,b)=>a.votes-b.votes)
    $: groupedPersonNames = viableGroups.map(g=>g.personNames).flat()
    $: availablePersons = $persons.filter(p=>
        viableGroups[openGroupIndex].personNames.includes(p.name) || 
        !groupedPersonNames.includes(p.name)
    )
    $: matchingPersons = filterText === "" ? availablePersons : 
        fuzzysort.go(filterText,availablePersons,{key:"name"}).map(r=>r.obj)

    const selectAll = () => {
        viableGroups[openGroupIndex].personNames = [...new Set([
            ...viableGroups[openGroupIndex].personNames, 
            ...matchingPersons.map(p=>p.name)
        ])];
        viableGroups=viableGroups;
    }
    const unselectAll = () => {
        viableGroups[openGroupIndex].personNames = viableGroups[openGroupIndex].personNames.filter(
            n=>!matchingPersons.map(p=>p.name).includes(n)
        )
        viableGroups=viableGroups;
    }
    const resetDecisions = () => {
        $groups = $groups.map((g) => {
            g.personNames = [];
            return g;
        })
        $groups=$groups;
        viableGroups=viableGroups;
    }
    const toggleMatchingPerson = () => {
        if (matchingPersons.length > 0) {
            // toggle matching name
            const matchingName = matchingPersons[0].name
            if (viableGroups[openGroupIndex].personNames.includes(matchingName)) {
                viableGroups[openGroupIndex].personNames = viableGroups[openGroupIndex].personNames.filter(
                    n => n !== matchingName
                )
            } else {
                viableGroups[openGroupIndex].personNames = [...new Set([
                    ...viableGroups[openGroupIndex].personNames, 
                    matchingName
                ])];
            }
        } else {
            // add name to persons and group
            $persons = [
                ...$persons,
                {name: filterText}
            ]
            viableGroups[openGroupIndex].personNames = [...new Set([
                ...viableGroups[openGroupIndex].personNames, 
                filterText
            ])];
        }
        viableGroups=viableGroups;
    }
    $: enoughGroups = viableGroups.some(g=>decided(g));
    $: $groups=$groups
</script>

<h3>You're ready and you're willing.</h3>
<div class="row flex-edges padding-none">
    <div class="sm-10 col padding-none">
        <p>
            Starting with the group that received the least votes (but at least two),
            everyone simultaneously chooses whether to commit to working in that group, or
            waiting to participate in a more popular group.
        </p>
        <p>
            If enough people
            commit to the group, it runs — otherwise, they can join one of the later groups.
        </p>
    </div>
    <div class="sm-2 col text-right padding-none">
        <p>
            <Button on:click={resetDecisions} size="small" outline="danger">Reset all decisions.</Button>
        </p>
    </div>
</div>

{#each viableGroups as group, groupIndex}
    <Collapsible 
        label={`${group.name} (${group.votes} votes, ${group.personNames.length} members)`} 
        open={openGroupIndex===groupIndex} 
        on:open={_=>toggleGroup(groupIndex)}>
        <p>
            Members:
            {#each viableGroups[openGroupIndex].personNames as name}<Badge>{name}</Badge> {:else}(none){/each}
            </p>
            <form on:submit|preventDefault={toggleMatchingPerson}>
                <Input style="display:inline-block" placeholder="Filter people" bind:value={filterText} />
            </form>
        <p>
            <Button on:click={selectAll} size="small">Select all</Button>
            <Button on:click={unselectAll} size="small">Unselect all</Button>
            {#if filterText!==""}<Button on:click={()=>filterText=""} size="small">Remove filter</Button>{/if}
        </p>
        <fieldset class="form-group">
            {#each matchingPersons as person} 
                <Checkbox 
                    label={person.name} 
                    checked={viableGroups[openGroupIndex]?.personNames.includes(person.name)} 
                    value={person.name}
                    bind:group={viableGroups[openGroupIndex].personNames} />
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
        <Button isLink 
            type="secondary"
            href={enoughGroups?"/summary":"#"}
            disabled={!enoughGroups}>
            Get away with it, you meddling kids! &raquo;
        </Button>
    </BottomNavItem>
    <BottomNavItem>
        <Button isLink href="/votes" outline="primary">&laquo; Actually, time for a recount.</Button>
    </BottomNavItem>
</BottomNav>
