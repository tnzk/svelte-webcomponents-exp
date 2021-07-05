<svelte:options tag="swc-pass-object-wr" />

<script>
export let key
let name

const refresh = () => {
  name = window.__myData['somekey'].name
}
refresh()

$: window.__myData['somekey'].name = name

</script>

Hello, {name} <button on:click={refresh}>Refresh</button>
<input bind:value={name}>