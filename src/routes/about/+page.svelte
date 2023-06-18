<script lang="ts">
    import { Button } from 'spaper';
    import BottomNav from '../../components/BottomNav.svelte';
    import BottomNavItem from '../../components/BottomNavItem.svelte';
</script>

<h3>Hang on, what is this?</h3>
<p>
    Do you have a large team with lots of great ideas?
    Do you need to split off into several working groups,
    but aren't sure how to choose what topics are a priority
    for your team?
</p>
<p>
    This simple app implements the <a href="https://aimath.org">AIM model</a>
    for working group selection. Follow the instructions, starting with
    <a href="/">naming your people</a>, and your team will be on task in no time.
    Jenkees!
</p>

<BottomNav>
    <BottomNavItem>
        <Button isLink type="secondary" href="/">Let's get started!</Button>
    </BottomNavItem>
</BottomNav>

<div class="container container-xs paper padding-small">
    <p class="text-center">
        <small>
            <a href="https://clontz.org">Steven</a> made this, blame him.
            <Button isLink size="small" outline="primary" href="https://github.com/StevenClontz/LetsSplitUpGang">GitHub</Button>
        </small>
    </p>
</div>