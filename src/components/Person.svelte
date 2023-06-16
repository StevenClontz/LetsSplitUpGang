<script lang="ts">
    import type { PersonT } from "../types/person.type";
    export let person:PersonT;
</script>

<input bind:value={person.name}/>
