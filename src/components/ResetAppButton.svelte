<script lang="ts">
    import { Button } from 'spaper';
    import { persons, groups, intitalPersons, intitalGroups } from '../stores';
    const reset = () => $persons=intitalPersons; $groups=intitalGroups;
</script>

<Button size="small" outline="danger" on:click={reset}>Reset app data</Button>