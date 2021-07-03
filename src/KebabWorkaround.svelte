<svelte:options tag="webdb-kebab-wr" />

<script>
  import { onMount, beforeUpdate } from 'svelte';
  import { get_current_component } from 'svelte/internal';

  onMount(() => {
    name = $$props['your-name']
    const compo = get_current_component()
    console.log(compo)
  })
  let name = $$props['your-name']
</script>

Hello, {name}諦め