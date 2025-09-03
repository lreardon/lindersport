import MenuDrawer from './menu-drawer.js'

class HeaderDrawer extends MenuDrawer {
constructor() {
    super()
}

setBottomPosition() {
    this.header =
    this.header || document.getElementById('shopify-section-header')

    this.borderOffset =
    this.borderOffset ||
    this.closest('.header-wrapper').classList.contains(
        'header-wrapper--border-bottom'
    )
        ? 1
        : 0
        //adjusted to be the same height as the header at all viewports
    document.documentElement.style.setProperty(
    '--header-bottom-position',
    `60px`
    )
}

// setSizeGuidePosition() {
//   this.sizeGuide =
//     this.sizeGuide || document.querySelector('.size-guide');

//   this.sizeGuideOffset =
//     this.sizeGuideOffset ||
//     this.sizeGuide.closest('.size-guide-wrapper').classList.contains(
//       'size-guide-wrapper--border-bottom'
//     )
//       ? 1
//       : 0;
//   // Adjusted to be the same height as the size guide at all viewports
//   document.documentElement.style.setProperty(
//     '--size-guide-position',
//     `60px`
//   );
// }
  
openMenuDrawer(summaryElement) {
    this.setBottomPosition()

    let scrollableNav = summaryElement.closest('details').querySelector('.header__drawer-inner nav')
    // console.log(scrollableNav)
    bodyScroll.lock(scrollableNav)

    setTimeout(() => {
    this.mainDetailsToggle.classList.add('menu-opening')
    })

    summaryElement.setAttribute('aria-expanded', true)
    trapFocus(this.mainDetailsToggle, summaryElement)
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`)
}

removeLock() {
    if (document.body.getAttribute('style').includes('overflow: hidden'))
    bodyScroll.clear()

    if (!this.mainSummary) return
    this.mainSummary.click()
}

connectedCallback() {
    this.setBottomPosition()
    this.mainSummary = this.querySelector('.js-summary')

    if (this.mainSummary)
    this.mainSummary.addEventListener('click', () => {
        if (this.mainSummary.parentElement.hasAttribute('open'))
        bodyScroll.clear()
    })

    this.closeButtons = this.querySelectorAll('.js-drawer-close')
    this.closeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault()
        this.removeLock()
    })
    })

    this.inner = this.querySelector('.js-drawer-inner')

    this.inner.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.tagName.toLowerCase() != 'a') return false
    this.removeLock()
    })
}
}

export default HeaderDrawer;