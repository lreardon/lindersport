if (!customElements.get('cart-remove')) {
  class CartRemove extends HTMLElement {
    constructor() {
      super();
    }

    /**
     * Replaces the innerHtml of the current cart section with the innerHTML of the new cart page.
     * The updateCart function is located in helperFunctions.js
     *
     * @param {String} cart - The entire cart page HTML
     */

    connectedCallback() {
      this.section = this.closest('.js-cart')
      this.link = this.querySelector('a');
      if(!this.link || !this.section) return;

      this.url = this.link.getAttribute('href');

      this.link.addEventListener('click', (event) => {
        event.preventDefault();

        removeFromCart(this.url, updateCart, null);
      });
    }
  }
  customElements.define('cart-remove', CartRemove);
}
