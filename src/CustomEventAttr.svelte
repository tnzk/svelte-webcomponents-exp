// TODO
<svelte:options tag="swc-custom-events-wa-attr" />

<script>
  import { createEventDispatcher } from 'svelte';
  import { get_current_component } from 'svelte/internal';

  const component = get_current_component();
  const originalDispatch = createEventDispatcher();

  const dispatch = (name, detail) => {
    originalDispatch(name, detail);
    component?.dispatchEvent(new CustomEvent(name, { detail }));
  }

  export let name
  $: (name) && dispatch('namechanged', { name })
</script>

Hello, {name}
<input bind:value={name}>