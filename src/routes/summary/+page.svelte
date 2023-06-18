<script lang="ts">
    import { groups } from "../../stores";
    import type { GroupT } from "../../types/group.type";
    import { Button } from "spaper";
    import BottomNav from "../../components/BottomNav.svelte";
    import BottomNavItem from "../../components/BottomNavItem.svelte";
	import { decided } from "../../utils";
    let decidedGroups:GroupT[];
    $: decidedGroups = $groups.filter(g=>decided(g))
    $: $groups = $groups
</script>

<h3>Time to get things done!</h3>

<p>Get away with it, you meddling kids!</p>

<div class="row">
    {#each decidedGroups as group}
        <div class="sm-6 md-4 col paper padding-small">
            <h4 class="margin-small">{group.name}</h4>
            <ul>
                {#each group.personNames as name}
                    <li>{name}</li>
                {/each}
            </ul>
            <textarea 
                style={`resize:none;width:100%;height:${(group.notes?.split("\n").length+2)*1.15}em`} 
                placeholder="(notes)"
                bind:value={group.notes}/>
        </div>
    {/each}
</div>

<BottomNav>
    <BottomNavItem>
        <Button isLink href="/decisions" outline="primary">&laquo; Are you sure about that, Scoob?</Button>
    </BottomNavItem>
</BottomNav>
