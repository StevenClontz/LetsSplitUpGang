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
    $: markdown = decidedGroups.map(
        g => `## ${g.name}\n\n` +
          g.personNames.map(n=>`- ${n}`).join(`\n`) + 
          `\n\n` + g.notes +
          `\n`
    ).join("\n")
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

<div class="row">
<div class="md-2"/>
<div class="md-8 col padding-small">
    <h4>Markdown Summary</h4>
    <textarea readonly style="width:100%;height:5em" value={markdown}/>
</div>
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
