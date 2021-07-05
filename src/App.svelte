<svelte:options tag="swc-root" />
<svelte:window on:load={() => handleLoad()} />

<script>
  import Kebab from  './Kebab.svelte'
  import './KebabWrapper'
  import './NoUppercase.svelte'
  import PassAnObject from './PassAnObject.svelte'
  import './WAPassAnObject.svelte'
  import CustomEventExample from './CustomEventExample.svelte'
  import './CustomEventWA.svelte'
  import './CustomEventAttr.svelte'
  import StylesEncupsulated from './StylesEncupsulated.svelte'

  let name = 'default name'

  let data = {}
  $: data.name = name

  window.__myData = {
    'somekey': {}
  }
  $: window.__myData['somekey'].name = name
  const syncToParent = () => {
    name = window.__myData['somekey'].name
  }

  const handleCustomEvent = (event) => name = event.detail.name

  let rootElement
  let customEventElement
  let customEventWAElement
  const handleLoad = () => {
    customEventElement = rootElement.querySelector('swc-custom-events')
    customEventElement.addEventListener('namechanged', handleCustomEvent)
    customEventWAElement = rootElement.querySelector('swc-custom-events-wa')
    customEventWAElement.addEventListener('namechanged', handleCustomEvent)
  }
  $: if (customEventElement) customEventElement.name = name
  $: if (customEventWAElement) customEventWAElement.name = name

</script>

<div bind:this={rootElement}>
  <h1>『Svelte で Web Components を開発するときの落とし穴 (2021年7月時点)』の参考コード</h1>
  <input bind:value={name}>

  <h2><a href="#">ケバブケース (aaa-bb-cc) の属性名を props として使えない</a></h2>
  <p>カスタム要素: <swc-kebab your-name={name}></swc-kebab></p>
  <p>Svelte コンポーネント: <Kebab your-name={name} /></p>
  <p>カスタム要素（対処策つき）: <swc-kebab-fixed your-name={name}></swc-kebab-fixed></p>

  <h2><a href="#">属性名に大文字が使えない</a></h2>
  <p><swc-no-uppercase yourName={name}></swc-no-uppercase></p>

  <h2>
    <a href="#">DOM API経由の属性直の変更はサポートされているが、bind 機構はサポートされてない</a> && 
    <a href="#">属性値には文字列しか設定できない</a>
  </h2>
  <p>カスタム要素: <swc-pass-object name={data}></swc-pass-object></p>
  <p>Svelte コンポーネント: <PassAnObject {data} /></p>
  <p>カスタム要素: <swc-pass-object-wr key="somekey"></swc-pass-object-wr><button on:click={syncToParent}>Sync to input field</button></p>

  <h2><a href="#">Svelte でカスタムイベントを送出するようにしても、DOMイベントは飛ばない</a></h2>
  <p>Svelte コンポーネント: <CustomEventExample {name} on:namechanged={handleCustomEvent} /></p>
  <p>カスタム要素: <swc-custom-events name={name}></swc-custom-events></p>
  <p>カスタム要素: <swc-custom-events-wa name={name}></swc-custom-events-wa></p>
  <!-- TODO:  無理そう
    <p>カスタム要素: <swc-custom-events-wa-attr name={name} onnamechaged=""></swc-custom-events-wa-attr></p>
  -->
  <h2><a href="#">Svelte コンポーネントとしてマウントした場合、下位コンポーネントのスタイルはインライン指定でしか反映されない</a></h2>
  <p>Svelte コンポーネント: <StylesEncupsulated {name} /></p>
  <p>カスタム要素: <swc-styles-encapsulated name={name}></swc-styles-encapsulated></p>
</div>