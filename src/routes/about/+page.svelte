<script lang="ts">
    import { Button } from 'spaper';
    import { groups } from "../../stores";
    let groupsStringArray:string[] = $groups.map(g=>g.name);
    $: $groups = groupsStringArray.map((s,i) => {
        if (i < $groups.length) {
            let p = $groups[i];
            p.name = s;
            return p
        } else {
            return {name: s, votes: 0}
        }
    })
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
<p class="text-center">
    <Button size="small" outline="secondary" href="/">Let's get started!</Button>
</p>
<p>
    <small><a href="https://clontz.org">Steven</a> made this, blame him.</small>
</p>