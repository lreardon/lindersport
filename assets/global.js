// import MenuDrawer from './menu-drawer.js'
import HeaderDrawer from './header-drawer.js'
import SizeGuide from './size-guide.js'

// Resets page scroll to 0 on first load.
// Can be auto or manual
history.scrollRestoration = 'manual'

//////////////////////////////////////////////////////////////Start stack overflow


////////////////////////////////////////////////////////////// end Stack Overflow

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const classes = entry.target.getAttribute('data-js-animation')
      if (!classes) return

      entry.target.classList.add(classes)
    }
  })
})

function globalScroll(y, behavior) {
  if (zenscroll) zenscroll.toY(y)

  window.scrollTo({ top: y, behavior })
}

/**
 * Images loaded with AJAX on Safari render incorrectly. This function sets the image width or height (whichever is larger)
 * from the html attributes to a css style to force Safari to render the images correctly
 *
 * @param {*} images - Array or NodeList of <img>
 */

const safariResize = (images) => {
  images.forEach((image) => {
    const width = image.getAttribute('width')
    const height = image.getAttribute('height')

    if (width > height) {
      image.style.width = width + 'px'
    } else {
      image.style.height = height + 'px'
    }

    image.setAttribute('srcset', image.getAttribute('srcset'))
  })
}

/**
 * Initializes the animated elements and connects them to the intersection observer. Used in the {@link changeLocation} function to reinitialize the animated elements when the pages change.
 */

const initAnimations = () => {
  const animatedElements = document.querySelectorAll('.js-animated')

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

initAnimations()

/**
 * Changes the current location (history.state) of the browser window and reinitializes the animations {@link initAnimations}
 *
 * @param {String} url
 * @param {Boolean} shouldPush - Whether the state should be pushed to history
 */
const changeLocation = (url, shouldPush = true) => {
  if (shouldPush) {
    window.location.href = url;
  } else {
    window.location.replace(url);
  }
}

// function scrollToSection(href, event) {
//   if (!href) return

//   if (event) {
//     event.preventDefault()
//     event.stopPropagation()
//   }

//   const section = document.getElementById(href.split('#')[1])

//   if (!section) return
//   if (section.getBoundingClientRect().top == document.body.scrollTop) return

//   window.setTimeout(() => {
//     if (url[1] != '#') window.scrollTo({ top: 0, behavior: 'auto' })

//     document.body.removeAttribute('class')
//     document.body.setAttribute('class', html.body.getAttribute('class'))
//     document.body.innerHTML = html.body.innerHTML
//     document.body.classList.add(document.body.getAttribute('data-js-animation'))
//     if (url[1] == '#') window.setTimeout(() => scrollToSection(url, false), 500)
//     initAnimations()
//   }, 500)

//   bodyScroll.unlock(section)

//   if (zenscroll) return zenscroll.to(section)

//   section.scrollIntoView({ behavior: 'smooth', block: 'start' })
// }

function scrollToSection(href, event) {
  if (!href) return

  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  const section = document.getElementById(href.split('#')[1])

  if (!section) return
  if (section.getBoundingClientRect().top == document.body.scrollTop) return

  bodyScroll.unlock(section)

  if (zenscroll) return zenscroll.to(section)

  section.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

document.body.addEventListener('click', (event) => {
  let closestAnchor = event.target.closest('a')

  if (!(event.target instanceof HTMLAnchorElement) && !closestAnchor) return
  if ((event.metaKey, event.ctrlKey)) return

  const url =
    event.target.getAttribute('href') ?? closestAnchor.getAttribute('href')
  if (url[0] == '#') return scrollToSection(url, event)
  if (url[0] != '/') return

  event.preventDefault()

  changeLocation(url, true)
})

window.addEventListener('popstate', () => {
  changeLocation(document.location, false)
})

class QuantityInput extends HTMLElement {
  constructor() {
    super()
    this.input = this.querySelector('input')
    this.changeEvent = new Event('change', { bubbles: true })

    this.querySelectorAll('button').forEach((button) =>
      button.addEventListener('click', this.onButtonClick.bind(this))
    )
  }

  onButtonClick(event) {
    event.preventDefault()
    const previousValue = this.input.value

    event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown()
    if (previousValue !== this.input.value)
      this.input.dispatchEvent(this.changeEvent)
  }
}

customElements.define('quantity-input', QuantityInput)

/*
 * Shopify Common JS
 *
 */
if (typeof window.Shopify == 'undefined') {
  window.Shopify = {}
}

Shopify.bind = function (fn, scope) {
  return function () {
    return fn.apply(scope, arguments)
  }
}

Shopify.setSelectorByValue = function (selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i]
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i
      return i
    }
  }
}

Shopify.addListener = function (target, eventName, callback) {
  target.addEventListener
    ? target.addEventListener(eventName, callback, false)
    : target.attachEvent('on' + eventName, callback)
}

Shopify.postLink = function (path, options) {
  options = options || {}
  var method = options['method'] || 'post'
  var params = options['parameters'] || {}

  var form = document.createElement('form')
  form.setAttribute('method', method)
  form.setAttribute('action', path)

  for (var key in params) {
    var hiddenField = document.createElement('input')
    hiddenField.setAttribute('type', 'hidden')
    hiddenField.setAttribute('name', key)
    hiddenField.setAttribute('value', params[key])
    form.appendChild(hiddenField)
  }
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

Shopify.CountryProvinceSelector = function (
  country_domid,
  province_domid,
  options
) {
  this.countryEl = document.getElementById(country_domid)
  this.provinceEl = document.getElementById(province_domid)
  this.provinceContainer = document.getElementById(
    options['hideElement'] || province_domid
  )

  Shopify.addListener(
    this.countryEl,
    'change',
    Shopify.bind(this.countryHandler, this)
  )

  this.initCountry()
  this.initProvince()
}

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function () {
    var value = this.countryEl.getAttribute('data-default')
    Shopify.setSelectorByValue(this.countryEl, value)
    this.countryHandler()
  },

  initProvince: function () {
    var value = this.provinceEl.getAttribute('data-default')
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value)
    }
  },

  countryHandler: function (e) {
    var opt = this.countryEl.options[this.countryEl.selectedIndex]
    var raw = opt.getAttribute('data-provinces')
    var provinces = JSON.parse(raw)

    this.clearOptions(this.provinceEl)
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none'
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option')
        opt.value = provinces[i][0]
        opt.innerHTML = provinces[i][1]
        this.provinceEl.appendChild(opt)
      }

      this.provinceContainer.style.display = ''
    }
  },

  clearOptions: function (selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild)
    }
  },

  setOptions: function (selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option')
      opt.value = values[i]
      opt.innerHTML = values[i]
      selector.appendChild(opt)
    }
  },
}

// customElements.define('menu-drawer', MenuDrawer)
customElements.define('size-guide-drawer', SizeGuide)
customElements.define('header-drawer', HeaderDrawer)

class ModalDialog extends HTMLElement {
  constructor() {
    super()
    this.querySelector('[id^="ModalClose-"]').addEventListener(
      'click',
      this.hide.bind(this)
    )
    this.addEventListener('click', (event) => {
      if (event.target.nodeName === 'MODAL-DIALOG') this.hide()
    })
    this.addEventListener('keyup', () => {
      if (event.code.toUpperCase() === 'ESCAPE') this.hide()
    })
  }

  show(opener) {
    this.openedBy = opener
    document.body.classList.add('overflow-hidden')
    this.setAttribute('open', '')
    this.querySelector('.template-popup')?.loadContent()
    trapFocus(this, this.querySelector('[role="dialog"]'))
  }

  hide() {
    document.body.classList.remove('overflow-hidden')
    this.removeAttribute('open')
    removeTrapFocus(this.openedBy)
    window.pauseAllMedia()
  }
}
customElements.define('modal-dialog', ModalDialog)

class ModalOpener extends HTMLElement {
  constructor() {
    super()

    const button = this.querySelector('button')
    button?.addEventListener('click', () => {
      document.querySelector(this.getAttribute('data-modal'))?.show(button)
    })
  }
}
customElements.define('modal-opener', ModalOpener)

class DeferredMedia extends HTMLElement {
  constructor() {
    super()
    this.querySelector('[id^="Deferred-Poster-"]')?.addEventListener(
      'click',
      this.loadContent.bind(this)
    )
  }

  loadContent() {
    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div')
      content.appendChild(
        this.querySelector('template').content.firstElementChild.cloneNode(true)
      )

      this.setAttribute('loaded', true)
      window.pauseAllMedia()
      this.appendChild(
        content.querySelector('video, model-viewer, iframe')
      ).focus()
    }
  }
}

customElements.define('deferred-media', DeferredMedia)
