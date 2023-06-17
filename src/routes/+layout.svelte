<script lang="ts">
    import 'papercss/dist/paper.min.css';
    import { onMount } from 'svelte';
    import { Skeleton, Breadcrumb } from 'spaper';
    import { page } from '$app/stores';
    import type { BreadcrumbItemT } from '../types/breadcrumbItem.type';
    onMount(() => {
        setInterval(() => loading = false, 500);
    })
    let loading = true;
    let items:BreadcrumbItemT[] = [];
    $: if ($page.url.pathname === "/") {
        items = [
            {text: "People"},
        ]
    } else if ($page.url.pathname === "/groups") {
        items = [
            {text: "People", href:"/"},
            {text: "Groups"},
        ]
    } else if ($page.url.pathname === "/voting") {
        items = [
            {text: "People", href:"/"},
            {text: "Groups", href:"/groups"},
            {text: "Voting"},
        ]
    } else if ($page.url.pathname === "/decide") {
        items = [
            {text: "People", href:"/"},
            {text: "Groups", href:"/groups"},
            {text: "Voting", href:"/voting"},
            {text: "Decide"},
        ]
    } else {
        items = [{text: "Zoinks!"}]
    }
</script>
  
<main class="container container-lg paper">
    <h1>Let's Split Up, Gang!</h1>
    {#if loading}
        <div class="container container-md"><Skeleton active={loading} /></div>
        <Skeleton active={loading} --width="5rem" --height="3rem" />
        <Skeleton active={loading} count={6} />
        <Skeleton active={loading} count={2} inline
                  --width="6rem" --height="2.5rem" />
    {:else}
        <div class="container container-md"><Breadcrumb border {items}/></div>
        <slot/>
    {/if}
</main>