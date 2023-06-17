<script lang="ts">
    import { groups } from "../../stores";
    import { Button } from "spaper";
    import { viableGroups } from '../../utils';
</script>

<h3>Time to get things done!</h3>

<p>Get cracking, you titans of industry/education/podcasting/whatever!</p>

<div class="row">
    {#each viableGroups($groups,{considerMembers:true}) as group}
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

<div class="row flex-edges">
    <div class="sm-6 col">
        <Button isLink href="/decisions" outline="primary">&laquo; Are you sure about that, Scoob?</Button>
    </div>
</div>
