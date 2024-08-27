class CartRemoveButton extends HTMLElement {
  constructor() {
    super()
    this.addEventListener('click', (event) => {
      event.preventDefault()
      this.closest('cart-items').updateQuantity(this.dataset.index, 0)
    })
  }
}

customElements.define('cart-remove-button', CartRemoveButton)

class CartItems extends HTMLElement {
  constructor() {
    super()

    this.lineItemStatusElement = document.getElementById(
      'shopping-cart-line-item-status'
    )
    this.cartItemsHeader = document.querySelector('.js-cart-items-header')

    this.currentItemCount = Array.from(
      this.querySelectorAll('[name="updates[]"]')
    ).reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0)

    this.debouncedOnChange = debounce((event) => {
      this.onChange(event)
    }, 300)

    this.addEventListener('change', this.debouncedOnChange.bind(this))
  }

  onChange(event) {
    this.updateQuantity(
      event.target.dataset.index,
      event.target.value,
      document.activeElement.getAttribute('name')
    )
  }

  getSectionsToRender() {
    const isCartPage = document.body.classList.contains('template-cart')
    const cartId = isCartPage ? 'cart' : 'mini-cart'
    return [
      {
        id: cartId,
        section: document.getElementById(cartId).dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '#cart-icon-bubble',
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section',
      },
    ]
  }

  updateQuantity(line, quantity, name) {
    // this.enableLoading(line);  // Will update in loading ticket

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname,
    })

    fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => {
        return response.text()
      })
      .then((state) => {
        const parsedState = JSON.parse(state)
        window.__CART__ = parsedState
        this.classList.toggle('is-empty', parsedState.item_count === 0)

        this.getSectionsToRender().forEach((section) => {
          const elementToReplace =
            document
              .getElementById(section.id)
              .querySelector(section.selector) ||
            document.getElementById(section.id)

          elementToReplace.innerHTML = this.getSectionInnerHTML(
            parsedState.sections[section.section],
            section.selector
          )
        })

        this.updateLiveRegions(line, parsedState.item_count)
        document
          .getElementById(`CartItem-${line}`)
          ?.querySelector(`[name="${name}"]`)
          ?.focus()
        // this.disableLoading();

        const statusBlock = document.querySelector('.js-product-totals')
        const qty =
          document.querySelector('.js-true-quantity-input')?.value || 0
        statusBlock?.updateText(parseInt(qty))
        document.querySelector('.js-cart-items-header').classList.add('active')
      })
      .catch(() => {
        // this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        if (document.getElementById('cart-errors')) {
          document.getElementById('cart-errors').textContent =
            window.cartStrings.error
        }
        // this.disableLoading();
      })
  }

  updateLiveRegions(line, itemCount) {
    if (this.currentItemCount === itemCount) {
      document
        .getElementById(`Line-item-error-${line}`)
        .querySelector('.cart-item__error-text').innerHTML =
        window.cartStrings.quantityError.replace(
          '[quantity]',
          document.getElementById(`Quantity-${line}`).value
        )
    }

    this.currentItemCount = itemCount
    this.lineItemStatusElement.setAttribute('aria-hidden', true)

    const cartStatus = document.getElementById('cart-live-region-text')
    cartStatus.setAttribute('aria-hidden', false)

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true)
    }, 1000)
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML
  }

  enableLoading(line) {
    document.getElementById('cart-items').classList.add('cart__items--disabled')
    this.querySelectorAll('.loading-overlay')[line - 1].classList.remove(
      'hidden'
    )
    document.activeElement.blur()
    this.lineItemStatusElement.setAttribute('aria-hidden', false)
  }

  disableLoading() {
    if (document.getElementById('cart-items')) {
      document
        .getElementById('cart-items')
        .classList.remove('cart__items--disabled')
    }
  }
}

customElements.define('cart-items', CartItems)

class CartCheckoutButton extends HTMLElement {
  constructor() {
    super()
    this.addEventListener('click', (event) => {
      event.preventDefault()
      this.classList.add('loading')

      const body = JSON.stringify({
        note,
      })
      fetch(`${routes.cart_update_url}`, { ...fetchConfig(), body })
        .then((response) => (location.href = '/checkout'))
        .catch((e) => {
          this.classList.remove('loading')
          console.error(e)
        })
    })
  }
}

customElements.define('cart-checkout-button', CartCheckoutButton)
