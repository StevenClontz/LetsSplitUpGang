<script lang="ts">
    import { Button, Slider, Form } from 'spaper';
    import { groups, persons } from "../../stores";
</script>

<h3>How excited are we about these?</h3>
<p>
    Get a rough count of how many people would participate in each group if they could.
    
</p>
<Form>
{#each $groups as group}
    <Slider block label={group.name} min={0} max={$persons.length} bind:value={group.votes}/>
{/each}
</Form>
<p>
    <Button href="/decide" type="secondary">Time to decide!</Button>
    <Button href="/groups" outline="primary">Er, let's take another look at those groups...</Button>
</p>