import Kebab from  './Kebab.svelte'

// Thanks to the workaround suggested here: https://github.com/sveltejs/svelte/issues/3852

class KebabFixed extends Kebab {
  static get observedAttributes() {
    return (super.observedAttributes || []).map(attr => attr.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase());
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    attrName = attrName.replace(/-([a-z])/g, (_, up) => up.toUpperCase());
    super.attributeChangedCallback(attrName, oldValue, newValue);
  }
}

customElements.define('swc-kebab-fixed', KebabFixed);