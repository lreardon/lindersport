class MenuDrawer extends HTMLElement {
    constructor() {
      super()
  
      this.mainDetailsToggle = this.querySelector('details')
      const summaryElements = this.querySelectorAll('summary')
      this.addAccessibilityAttributes(summaryElements)
  
      // if (navigator.platform === 'iPhone')
      //   document.documentElement.style.setProperty(
      //     '--viewport-height',
      //     `${window.innerHeight}px`
      //   )
  
      this.addEventListener('keyup', this.onKeyUp.bind(this))
      this.addEventListener('focusout', this.onFocusOut.bind(this))
      this.bindEvents()
    }
  
    bindEvents() {
      this.querySelectorAll('summary').forEach((summary) =>
        summary.addEventListener('click', this.onSummaryClick.bind(this))
      )
      this.querySelectorAll('button:not(.products__menu__category__button)').forEach((button) =>
        button.addEventListener('click', this.onCloseButtonClick.bind(this))
      )
    }
  
    addAccessibilityAttributes(summaryElements) {
      summaryElements.forEach((element) => {
        element.setAttribute('role', 'button')
        element.setAttribute('aria-expanded', false)
        element.setAttribute('aria-controls', element.nextElementSibling.id)
      })
    }
  
    onKeyUp(event) {
      if (event.code.toUpperCase() !== 'ESCAPE') return
  
      const openDetailsElement = event.target.closest('details[open]')
      if (!openDetailsElement) return
  
      openDetailsElement === this.mainDetailsToggle
        ? this.closeMenuDrawer(this.mainDetailsToggle.querySelector('summary'))
        : this.closeSubmenu(openDetailsElement)
    }
  
    onSummaryClick(event) {
      const summaryElement = event.currentTarget
      const detailsElement = summaryElement.parentNode
      const isOpen = detailsElement.hasAttribute('open')
  
      if (detailsElement === this.mainDetailsToggle) {
        if (isOpen) event.preventDefault()
        isOpen
          ? this.closeMenuDrawer(summaryElement)
          : this.openMenuDrawer(summaryElement)
      } else {
        trapFocus(
          summaryElement.nextElementSibling,
          detailsElement.querySelector('button')
        )
  
        setTimeout(() => {
          detailsElement.classList.add('menu-opening')
        })
      }
    }
  
    openMenuDrawer(summaryElement) {
      setTimeout(() => {
        this.mainDetailsToggle.classList.add('menu-opening')
      })
      summaryElement.setAttribute('aria-expanded', true)
      trapFocus(this.mainDetailsToggle, summaryElement)
      document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`)
    }
  
    closeMenuDrawer(event, elementToFocus = false) {
      if (event !== undefined) {
        this.mainDetailsToggle.classList.remove('menu-opening')
        this.mainDetailsToggle.querySelectorAll('details').forEach((details) => {
          details.removeAttribute('open')
          details.classList.remove('menu-opening')
        })
        this.mainDetailsToggle
          .querySelector('summary')
          .setAttribute('aria-expanded', false)
        document.body.classList.remove(
          `overflow-hidden-${this.dataset.breakpoint}`
        )
        removeTrapFocus(elementToFocus)
        this.closeAnimation(this.mainDetailsToggle)
      }
    }
  
    onFocusOut(event) {
      setTimeout(() => {
        if (
          this.mainDetailsToggle.hasAttribute('open') &&
          !this.mainDetailsToggle.contains(document.activeElement)
        )
          this.closeMenuDrawer()
      })
    }
  
    onCloseButtonClick(event) {
      const detailsElement = event.currentTarget.closest('details')
      this.closeSubmenu(detailsElement)
    }
  
    closeSubmenu(detailsElement) {
      detailsElement.classList.remove('menu-opening')
      removeTrapFocus()
      this.closeAnimation(detailsElement)
    }
  
    closeAnimation(detailsElement) {
      detailsElement.addEventListener('transitionend', () => {
              detailsElement.removeAttribute('open')
          if (detailsElement.closest('details[open]')) {
            trapFocus(
              detailsElement.closest('details[open]'),
              detailsElement.querySelector('summary')
            )
          }
              }, { once: true },)
    }
  }

  export default MenuDrawer;