<script lang="ts">
    export let value:string[];
    let rawValue:string=value.join("\n");
    $: value = rawValue.split("\n").filter(p=>p!=="")
</script>
<textarea 
    style={`resize:none;width:100%;height:${(rawValue.split("\n").length+2)*1.15}em`} 
    bind:value={rawValue}/>