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
            {text: "Home", href:"/"},
            {text: "People"},
        ]
    } else if ($page.url.pathname === "/about") {
        items = [
            {text: "Home", href:"/"},
            {text: "About"},
        ]
    } else if ($page.url.pathname === "/groups") {
        items = [
            {text: "Home", href:"/"},
            {text: "People", href:"/"},
            {text: "Groups"},
        ]
    } else if ($page.url.pathname === "/votes") {
        items = [
            {text: "Home", href:"/"},
            {text: "People", href:"/"},
            {text: "Groups", href:"/groups"},
            {text: "Votes"},
        ]
    } else if ($page.url.pathname === "/decisions") {
        items = [
            {text: "Home", href:"/"},
            {text: "People", href:"/"},
            {text: "Groups", href:"/groups"},
            {text: "Votes", href:"/votes"},
            {text: "Decisions"},
        ]
    } else {
        items = [
            {text: "Home", href:"/"},
            {text: "Zoinks!"},
        ]
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