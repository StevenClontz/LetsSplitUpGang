<script lang="ts">
    import { Button, Slider, Form } from 'spaper';
    import BottomNav from '../../components/BottomNav.svelte';
    import BottomNavItem from '../../components/BottomNavItem.svelte';
    import { groups, persons } from "../../stores";
    import { viableGroups } from "../../utils";
    const resetVotes = () => {
        $groups = $groups.map((g) => {
            g.votes = 0;
            return g;
        })
    }
</script>

<h3>How excited are we about these?</h3>
<div class="row flex-edges padding-none">
    <div class="sm-10 col padding-none">
        Get at least a rough count of how many people would participate in each group if they could.
    </div>
    <div class="sm-2 col text-right padding-none">
        <Button on:click={resetVotes} size="small" outline="danger">Reset all votes.</Button>
    </div>
</div>
<Form>
{#each $groups as group}
    <Slider block label={group.name} min={0} max={$persons.length} bind:value={group.votes}/>
{/each}
</Form>

<BottomNav>
    <BottomNavItem>
        <Button isLink 
            href={viableGroups($groups).length<2?"#":"/decisions"}
            type="secondary" 
            disabled={viableGroups($groups).length<2}>
            Time to decide! &raquo;
        </Button>
    </BottomNavItem>
    <BottomNavItem>
        <Button isLink href="/groups" outline="primary">&laquo; Er, let's take another look at those groups...</Button>
    </BottomNavItem>
</BottomNav>
