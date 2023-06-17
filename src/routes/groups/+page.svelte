<script lang="ts">
    import type { WorkingGroupT } from "../../types/workingGroup.type";
    import { Button } from 'spaper';
    let groups:WorkingGroupT[] = [];
    let groupsRaw:string = "";
    // $: persons = personsRaw.split("\n").map(s=>{
    //     return {name: s}
    // }).filter(p=>p.name!=="")
</script>

<h3>What's going on?</h3>
<p>Create a list of potential working groups, one per line below.</p>
<p>
    <textarea 
        style={`resize:none;width:100%;height:${(groupsRaw.split(/\n/).length+3)*1.1}em`} 
        bind:value={groupsRaw}/>
</p>
<p>
    <Button href="/groups/" type="primary">Now to form some groups...</Button>
</p>