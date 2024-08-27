if (!customElements.get('quantity-selector')) {
  class QuantitySelector extends HTMLElement {
    constructor() {
      super();
    }

    handleSuccess(html) {
      updateCart(html);
      changeHeaderLinkCount(html);
    }

    connectedCallback() {
      if(!this.dataset.quantity || !this.dataset.key) return;

      this.buttons = this.querySelectorAll('button');

      this.buttons.forEach((link) => {
        link.addEventListener('click', (event) => {
          event.preventDefault();

          if(!link.dataset.action) return;

          const quantity = Number(this.dataset.quantity) + Number(link.dataset.action);
          changeCartItemQuantity(this.dataset.key, quantity, (html) => this.handleSuccess(html), null);
        });
      });
    }
  }
  customElements.define('quantity-selector', QuantitySelector);
}
