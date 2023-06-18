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

<h3>Get away with it, you meddling kids!</h3>

<p>
    You can add any notes you want for each group (such as where the group will meet).
</p>

<div class="row">
    {#each decidedGroups as group}
        <div class="sm-6 md-4 col padding-small">
            <div class="paper padding-small">
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
        </div>
    {/each}
</div>

<BottomNav>
    <BottomNavItem>
        <Button isLink href="/decisions" outline="primary">&laquo; Ruh roh, something's not right.</Button>
    </BottomNavItem>
</BottomNav>

<BottomNav>
    <BottomNavItem>
        <Button isLink href="/" outline="success">&laquo;&laquo; Time for a reboot.</Button>
    </BottomNavItem>
</BottomNav>
