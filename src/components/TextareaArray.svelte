<script lang="ts">
    export let arr:string[];
    let value:string="";
    $: arr = value.split("\n").filter(p=>p!=="")
</script>
<textarea 
    style={`resize:none;width:100%;height:${(arr.length+3)*1.15}em`} 
    bind:value/>