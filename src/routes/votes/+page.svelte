<script lang="ts">
    import { Button, Slider, Form } from 'spaper';
    import BottomNav from '../../components/BottomNav.svelte';
    import BottomNavItem from '../../components/BottomNavItem.svelte';
    import { groups, persons } from "../../stores";
	import { viable } from '../../utils';
    const resetVotes = () => {
        $groups = $groups.map((g) => {
            g.votes = 0;
            return g;
        })
    }
    let enoughGroups:boolean;
    $: enoughGroups = $groups.filter(g=>viable(g)).length>1
</script>

<h3>Don't hold back!</h3>
<div class="row flex-edges padding-none">
    <div class="sm-10 col padding-none">
        <p>
            Get at least a rough count of how many people would participate in each group if they could.
        </p>
    </div>
    <div class="sm-2 col text-right padding-none">
        <p>
            <Button on:click={resetVotes} size="small" outline="danger">Reset all votes.</Button>
        </p>
    </div>
</div>
<Form>
{#each $groups as group}
    <Slider style="margin-bottom:2em;" block label={group.name} min={0} max={$persons.length} bind:value={group.votes}/>
{/each}
</Form>

<BottomNav>
    <BottomNavItem>
        <Button isLink 
            type="secondary" 
            href={enoughGroups?"/decisions":"#"}
            disabled={!enoughGroups}>
            You're ready and you're willing. &raquo;
        </Button>
    </BottomNavItem>
    <BottomNavItem>
        <Button isLink 
            href="/groups" 
            outline="primary">
            &laquo; Er, let's take another look at those groups...
        </Button>
    </BottomNavItem>
</BottomNav>
