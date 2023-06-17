<script lang="ts">
    import { Button, Slider, Form } from 'spaper';
    import { groups, persons } from "../../stores";
    import type { GroupT } from "../types/group.type";
    let sortedGroups:GroupT[] = $groups;
</script>

<h3>I choose you!</h3>
<p>
    Starting with the group that recieved the least votes,
    each person chooses whether to commit to working in that group or
    waiting to participate in a more popular group. If enough people
    commit to the group, it runs - otherwise they can join another group.
</p>
<Form>
{#each sortedGroups as group}
    <Slider block label={group.name} min={0} max={$persons.length} bind:value={group.votes}/>
{/each}
</Form>
<p>
    <Button href="/decide" type="secondary">Time to decide!</Button>
    <Button href="/groups" outline="primary">Er, let's take another look at those groups...</Button>
</p>