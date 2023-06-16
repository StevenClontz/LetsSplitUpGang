<script lang="ts">
    import type { WorkingGroupT } from "../types/workingGroup.type";
    export let group:WorkingGroupT;
</script>

<input bind:value={group.name}/>
