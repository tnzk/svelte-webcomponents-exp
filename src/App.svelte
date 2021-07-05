<svelte:options tag="swc-root" />
<svelte:window on:load={() => handleLoad()} />

<script>
  import Kebab from  './Kebab.svelte'
  import './KebabFixed'
  import './NoUppercase.svelte'
  import PassAnObject from './PassAnObject.svelte'
  import './PassAnObjectFixed.svelte'
  import CustomEventExample from './CustomEventExample.svelte'
  import './CustomEventFixed.svelte'
  import './CustomEventAttr.svelte'
  import StylesEncupsulated from './StylesEncupsulated.svelte'

  let lang = 'en'
  const i18n = {
    ja: {
      title: '『Svelte で Web Components を開発するときの落とし穴 (2021年7月時点)』の参考コード',
      subtitles: [
        'ケバブケース (aaa-bb-cc) の属性名を props として使えない',
        '属性名に大文字が使えない',
        'DOM API経由の属性直の変更はサポートされているが、bind 機構はサポートされてない',
        '属性値には文字列しか設定できない',
        'Svelte でカスタムイベントを送出するようにしても、DOMイベントは飛ばない',
        'Svelte コンポーネントとしてマウントした場合、下位コンポーネントのスタイルはインライン指定でしか反映されない',
      ],
      customElement: 'カスタム要素',
      svelteComponent: 'Svelte コンポーネント',
      customElementFixed: 'カスタム要素（対処策つき）',
    },
    en: {
      title: 'Reference code for "Pitfalls and workarounds for Web Components development on Svelte"',
      subtitles: [
        "Attributes named in kebab-case won't be recognized",
        "Attributes with upper-case letters won't be recognized",
        "Changing one of props via DOM API applies to the component, but bind mechanism doesn't work",
        "You can't pass an object other than a string through attributes",
        "Emiting a custom event in Svelte doesn't emit a DOM event automatically",
        "Styles defined in child components doesn't apply"
      ],
      customElement: 'Custom element',
      svelteComponent: 'Svelte Component',
      customElementFixed: 'Custom element (with workaround)',
    }
  }

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
    customEventWAElement = rootElement.querySelector('swc-custom-events-fixed')
    customEventWAElement.addEventListener('namechanged', handleCustomEvent)
  }
  $: if (customEventElement) customEventElement.name = name
  $: if (customEventWAElement) customEventWAElement.name = name

</script>

<button on:click={() => lang = 'en'} disabled={lang == 'en'}>English</button>
|
<button on:click={() => lang = 'ja'} disabled={lang == 'ja'}>日本語</button>

<div bind:this={rootElement}>
  <h1>{i18n[lang].title}</h1>
  <input bind:value={name}>

  <h2><a id="c00">{i18n[lang].subtitles[0]}</a></h2>
  <p>{i18n[lang].customElement}: <swc-kebab your-name={name}></swc-kebab></p>
  <p>{i18n[lang].svelteComponent}: <Kebab your-name={name} /></p>
  <p>{i18n[lang].customElementFixed}: <swc-kebab-fixed your-name={name}></swc-kebab-fixed></p>

  <h2><a id="c01">{i18n[lang].subtitles[1]}</a></h2>
  <p><swc-no-uppercase yourName={name}></swc-no-uppercase></p>

  <h2>
    <a id="c02">{i18n[lang].subtitles[2]}</a> && 
    <a id="c03">{i18n[lang].subtitles[3]}</a>
  </h2>
  <p>{i18n[lang].customElement}: <swc-pass-object name={data}></swc-pass-object></p>
  <p>{i18n[lang].svelteComponent}: <PassAnObject {data} /></p>
  <p>{i18n[lang].customElementFixed}: <swc-pass-object-fixed key="somekey"></swc-pass-object-fixed><button on:click={syncToParent}>Sync to input field</button></p>

  <h2><a id="c04">{i18n[lang].subtitles[4]}</a></h2>
  <p>{i18n[lang].customElement}: <CustomEventExample {name} on:namechanged={handleCustomEvent} /></p>
  <p>{i18n[lang].svelteComponent}: <swc-custom-events name={name}></swc-custom-events></p>
  <p>{i18n[lang].customElementFixed}: <swc-custom-events-fixed name={name}></swc-custom-events-fixed></p>

  <h2><a id="c05">{i18n[lang].subtitles[5]}</a></h2>
  <p>{i18n[lang].svelteComponent}: <StylesEncupsulated {name} /></p>
  <p>{i18n[lang].customElementFixed}: <swc-styles-encapsulated name={name}></swc-styles-encapsulated></p>
</div>