<svelte:options tag="swc-styles-encapsulated" />

<script>
export let name
</script>

<span>Hello, {name}</span>
and
<span style="color: purple; ">another {name ? name.toUpperCase() :  name}</span>

<style>
  span { color: blue }
</style>