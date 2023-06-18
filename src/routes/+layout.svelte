<script lang="ts">
    import 'papercss/dist/paper.min.css';
    import { onMount } from 'svelte';
    import { Skeleton, Breadcrumb, Hero } from 'spaper';
    import { page } from '$app/stores';
    import type { BreadcrumbItemT } from '../types/breadcrumbItem.type';
    onMount(() => {
        setInterval(() => loading = false, 500);
    })
    let loading = true;
    let items:BreadcrumbItemT[] = [];
    $: if ($page.url.pathname === "/") {
        items = [
            {text: "People", href:"#"},
            {text: "Groups"},
            {text: "Votes"},
            {text: "Decisions"},
            {text: "Summary"},
        ]
    } else if ($page.url.pathname === "/about") {
        items = [
            {text: "Home", href:"/"},
            {text: "About", href:"#"},
        ]
    } else if ($page.url.pathname === "/groups") {
        items = [
            {text: "People", href:"/"},
            {text: "Groups", href:"#"},
            {text: "Votes"},
            {text: "Decisions"},
            {text: "Summary"},
        ]
    } else if ($page.url.pathname === "/votes") {
        items = [
            {text: "People", href:"/"},
            {text: "Groups", href:"/groups"},
            {text: "Votes", href:"#"},
            {text: "Decisions"},
            {text: "Summary"},
        ]
    } else if ($page.url.pathname === "/decisions") {
        items = [
            {text: "People", href:"/"},
            {text: "Groups", href:"/groups"},
            {text: "Votes", href:"/votes"},
            {text: "Decisions", href:"#"},
            {text: "Summary"},
        ]
    } else if ($page.url.pathname === "/summary") {
        items = [
            {text: "People", href:"/"},
            {text: "Groups", href:"/groups"},
            {text: "Votes", href:"/votes"},
            {text: "Decisions", href:"/decisions"},
            {text: "Summary", href:"#"},
        ]
    } else {
        items = [
            {text: "Home", href:"/"},
            {text: "Zoinks!", href:"#"},
        ]
    }
</script>

<svelte:head>
    <title>Let's Split Up, Gang!</title> 
</svelte:head>
  
<main class="container container-lg paper">
    <Hero type="primary" title="Let's Split Up, Gang!" />
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