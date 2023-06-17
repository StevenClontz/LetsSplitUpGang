<script lang="ts">
    import { Button, Badge } from 'spaper';
    import { groups } from "../../stores";
    import { viableGroups } from '../../utils';
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
{#each viableGroups($groups) as group}
    <h3>{group.name} <Badge type="warning" rounded>{group.votes}</Badge></h3>

{/each}
<p>
</p>
<div class="row flex-edges">
    <div class="sm-6 col">
        <Button isLink href="/votes" outline="primary">&laquo; Actually, time for a recount.</Button>
    </div>
    <div class="sm-6 col text-right">
        <Button isLink href="/locations" type="secondary">Where are we meeting? &raquo;</Button>
    </div>
</div>