class MiniCartToggle extends HTMLElement {
  constructor() {
    super()

    const isCartPage = document.body.classList.contains('template-cart')

    this.cartIcon = document.getElementById('cart-icon-bubble')
    this.miniCart = document.getElementById('mini-cart')

    this.closeCartIcon = this.querySelector('.js-cart-close')
    this.cartIcon.addEventListener('click', (evt) => {
      evt.preventDefault()
      if (!isCartPage) {
        this.open()
      }
    })

    if (!isCartPage) {
      this.onBodyClick = this.handleBodyClick.bind(this)
    }

    if (this.closeCartIcon) {
      this.closeCartIcon.addEventListener('click', () => {
        this.close()
      })
    }
  }

  open() {
    this.miniCart.classList.add('animate', 'active')
    this.miniCart.addEventListener(
      'transitionend',
      () => {
        this.cartIcon.focus()
      },
      { once: true }
    )
    trapFocus(this.miniCart)

    document.body.addEventListener('click', this.onBodyClick)
    document.body.classList.add('overflow-hidden')
  }

  close() {
    this.miniCart.classList.remove('active')

    removeTrapFocus()
    document.body.removeEventListener('click', this.onBodyClick)
    document.body.classList.remove('overflow-hidden')
  }

  handleBodyClick(evt) {
    const target = evt.target

    if (
      target !== this.miniCart &&
      !target.closest('#cart-icon-bubble') &&
      !this.miniCart.contains(target)
    ) {
      this.close()
    }
  }
}

customElements.define('mini-cart-toggle', MiniCartToggle)
