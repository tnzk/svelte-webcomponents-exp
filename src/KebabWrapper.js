import Kebab from  './Kebab.svelte'

class KebabWrapper extends Kebab {
  static get observedAttributes() {
    return (super.observedAttributes || []).map(attr => attr.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase());
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    attrName = attrName.replace(/-([a-z])/g, (_, up) => up.toUpperCase());
    super.attributeChangedCallback(attrName, oldValue, newValue);
  }
}

customElements.define('swc-kebab-fixed', KebabWrapper);