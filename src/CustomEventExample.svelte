<svelte:options tag="swc-custom-events" />

<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let name
  $: (name) && dispatch('namechanged', { name })
</script>

Hello, {name}
<input bind:value={name}>