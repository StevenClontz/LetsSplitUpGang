<script>
    import 'papercss/dist/paper.min.css';
    import { onMount } from 'svelte';
    import { Skeleton } from 'spaper';
    onMount(() => {
        setInterval(() => loading = false, 500);
    })
    let loading = true;
</script>
  
<main class="container container-lg paper">
    <h1>Let's Split Up, Gang!</h1>
    {#if loading}
        <Skeleton active={loading} --width="5rem" --height="3rem" />
        <Skeleton active={loading} count={6} />
        <Skeleton active={loading} count={2} inline
                  --width="6rem" --height="2.5rem" />
    {:else}
        <slot/>
    {/if}
</main>