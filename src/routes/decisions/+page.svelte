<script lang="ts">
    import { Button, Badge, Collapsible, Input, Checkbox } from 'spaper';
    import fuzzysort from 'fuzzysort';
    import { groups, persons } from "../../stores";
	import type { GroupT } from '../../types/group.type';
	import type { PersonT } from '../../types/person.type';
    import BottomNav from '../../components/BottomNav.svelte';
    import BottomNavItem from '../../components/BottomNavItem.svelte';  
	import { viable } from '../../utils';
    let openGroup = 0;
    let filterText = "";
	import { decided } from "../../utils";
    const toggleGroup = (i:number) => {
        openGroup = i;
        filterText = "";
    }
    let viableGroups:GroupT[];
    $: viableGroups = $groups.filter(g=>viable(g))
    const matchingPersons = (ft:string,group:GroupT):PersonT[] => {
        const ps = $persons.filter((p)=>{
            return !viableGroups.some(
                g=>g.name!==group.name && g.personNames.includes(p.name)
            )
        })
        if (ft==="") {
            return ps
        }
        return fuzzysort.go(ft,ps,{key:"name"}).map(r=>r.obj)
    }
    const selectAll = (ft:string,group:GroupT) => {
        group.personNames = [...new Set([
            ...group.personNames, 
            ...matchingPersons(ft,group).map(p=>p.name)
        ])];
        $groups = $groups;
    }
    const unselectAll = (ft:string,group:GroupT) => {
        group.personNames = group.personNames.filter(
            n=>!matchingPersons(ft,group).map(p=>p.name).includes(n)
        )
        $groups = $groups;
    }
    const resetDecisions = () => {
        $groups = $groups.map((g) => {
            g.personNames = [];
            return g;
        })
    }
    $: $groups = $groups;
    let enoughGroups:boolean;
    $: enoughGroups = $groups.some(g=>decided(g));
</script>

<h3>You're ready and you're willing.</h3>
<div class="row flex-edges padding-none">
    <div class="sm-10 col padding-none">
        <p>
            Starting with the group that recieved the least votes (but at least two),
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
{#each viableGroups as group, i}
    <Collapsible 
        label={`${group.name} (${group.votes} votes, ${group.personNames.length} members)`} 
        open={openGroup===i} 
        on:open={_=>toggleGroup(i)}>
        <h4>
            {group.name}
            <Badge type="warning" rounded>{group.votes} votes</Badge>
            <Badge type={group.personNames.length>1?"success":"primary"} rounded>{group.personNames.length} members</Badge>
        </h4>
        <p>
            Members:
            {#each group.personNames as name}<Badge>{name}</Badge> {:else}(none){/each}
            </p>
        <p>
            <Input placeholder="Filter people" bind:value={filterText} />
            <Button on:click={()=>selectAll(filterText,group)} size="small">Select all</Button>
            <Button on:click={()=>unselectAll(filterText,group)} size="small">Unselect all</Button>
            {#if filterText!==""}<Button on:click={()=>filterText=""} size="small">Remove filter</Button>{/if}
        </p>
        <fieldset class="form-group">
            {#each matchingPersons(filterText,group) as person}   
                <Checkbox 
                    label={person.name} 
                    checked={group?.personNames.includes(person.name)} 
                    value={person.name}
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
