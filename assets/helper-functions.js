const bodyScroll = {
  lock(container) {
    bodyScrollLock.disableBodyScroll(container);
  },
  unlock(container) {
    bodyScrollLock.enableBodyScroll(container);
  },
  clear() {
    bodyScrollLock.clearAllBodyScrollLocks();
  }
};

const getFocusableElements = (container) => {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  )
}

const trapFocusHandlers = {}

const removeTrapFocus = (elementToFocus = null) => {
  document.removeEventListener('focusin', trapFocusHandlers.focusin)
  document.removeEventListener('focusout', trapFocusHandlers.focusout)
  document.removeEventListener('keydown', trapFocusHandlers.keydown)

  if (elementToFocus) elementToFocus.focus()
}

const trapFocus = (container, elementToFocus = container) => {
  var elements = getFocusableElements(container)
  var first = elements[0]
  var last = elements[elements.length - 1]

  removeTrapFocus()

  trapFocusHandlers.focusin = (event) => {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return

    document.addEventListener('keydown', trapFocusHandlers.keydown)
  }

  trapFocusHandlers.focusout = () => {
    document.removeEventListener('keydown', trapFocusHandlers.keydown)
  }

  trapFocusHandlers.keydown = (event) => {
    if (event.code.toUpperCase() !== 'TAB') return // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault()
      first.focus()
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault()
      last.focus()
    }
  }

  document.addEventListener('focusout', trapFocusHandlers.focusout)
  document.addEventListener('focusin', trapFocusHandlers.focusin)

  elementToFocus.focus()
}

const pauseAllMedia = () => {
  document.querySelectorAll('.js-youtube').forEach((video) => {
    video.contentWindow.postMessage(
      '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
      '*'
    )
  })
  document.querySelectorAll('.js-vimeo').forEach((video) => {
    video.contentWindow.postMessage('{"method":"pause"}', '*')
  })
  document.querySelectorAll('video').forEach((video) => video.pause())
  document
    .querySelectorAll('product-model')
    .forEach((model) => model.modelViewerUI?.pause())
}

const debounce = (fn, wait) => {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn.apply(this, args), wait)
  }
}

const throttle = (callback, limit) => {
  var waiting = false // Initially, we're not waiting
  return function () {
    // We return a throttled function
    if (!waiting) {
      // If we're not waiting
      callback.apply(this, arguments) // Execute users function
      waiting = true // Prevent future invocations
      setTimeout(function () {
        // After a period of time
        waiting = false // And allow future invocations
      }, limit)
    }
  }
}

const serializeForm = (form) => {
  const obj = {}
  const formData = new FormData(form)
  for (const key of formData.keys()) {
    obj[key] = formData.get(key)
  }
  return JSON.stringify(obj)
}

const fetchConfig = (type = 'json') => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: `application/${type}`,
    },
  }
}

/**
 * Checks to see if the device supports touch gestures.
 */
const isTouch = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints
}

/**
 * Clones a complex Javascript object. This is a
 * thorough way to ensure that the object is fully
 * cloned with no references kept in place.
 *
 * @param {Object} obj
 */
const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Formats a given integer to a standard fraction.
 *
 * @param {Integer} num A price, with cents
 * @param {Integer} fraction
 */
const formatPrice = (num, fraction = 2) => {
  return (
    '$' +
    (Number(num) / 100).toLocaleString('en-EN', {
      minimumFractionDigits: fraction,
    })
  )
}

/**
 * Removes whitespace within a string and makes all
 * characters lowercase.
 *
 * @param {String} str
 */
const handleize = (str) => str.replace(/[ /_]/g, '-').toLowerCase()

/**
 * Decodes a string that has been encoded through the 'url_encode' Shopify filter
 * @param {*} str
 */
const decode = (str) => decodeURIComponent(str).replace(/\+/g, ' ')

/**
 * Generates a URL that is suitable for the Shopify
 * image CDN. Adds the current image size suffix.
 *
 * @param {*} src
 * @param {*} size
 */
const getImageWithSize = (src = '', size = 1000) => {
  return ('' + src).replace(/([.](?:jpe?g|png))/, `_${size}x$1`)
}

/**
 * Used by components like the product card to select
 * the current product image based on the active color.
 * If there is no active color, a fallback image
 * should be returned if it is defined.
 *
 * @param {*} color
 * @param {*} images
 * @param {*} featured
 * @param {*} fallback
 */
const getProductImage = (
  name = '',
  value = '',
  images,
  featured = false,
  fallback = false
) => {
  const key = `${name}-${(value || '').replace(/[/ ]/g, '-')}`.toLowerCase()
  const image = (images || []).find(({ src }) => {
    return ~src.indexOf(key) && ~src.indexOf(featured ? 'pos-1' : 'pos-2')
  })
  if (!image) {
    return getImageWithSize(fallback, 600)
  }
  return getImageWithSize(image, featured ? 1200 : 600)
}

/**
 * Decode Storefront Product ID, this is used
 * with Storefront API
 *
 * @param {*} src
 * @param {*} size
 */
const decodeIDproduct = (id) => {
  return decodeURIComponent(escape(window.atob(id))).split(
    'gid://shopify/Product/'
  )[1]
}

/**
 * Encode from numerical to Storefront Product ID, this is used
 * with Storefront API
 *
 * @param {*} src
 * @param {*} size
 */
const encodeIDproduct = (id) => {
  return window.btoa('gid://shopify/Product/' + id)
}

/**
 * Decode Storefront Product Variant ID, this is used
 * with Storefront API
 *
 * @param {*} src
 * @param {*} size
 */
const decodeIDproductVariant = (id) => {
  return decodeURIComponent(escape(window.atob(id))).split(
    'gid://shopify/ProductVariant/'
  )[1]
}

const updateCart = (cart) => {
  const cartHTML = new DOMParser().parseFromString(cart, 'text/html');
  if(!cartHTML) return;

  const cartSection = document.querySelector('.js-cart')
  const newCartSection = cartHTML.querySelector('.js-cart');
  if(!cartSection || !newCartSection) return;

  cartSection.innerHTML = newCartSection.innerHTML;
}

const changeCartItemQuantity = (key, quantity, next, onError) => {
  if(!key) return;

  fetch(`${routes.cart_change_url}?id=${key}&quantity=${quantity}`)
    .then(res => res.text())
    .then((cart) => next(cart))
    .catch((err) => onError ? onError(err) : console.error(err));
}

/**
 * Removes an item from the cart
 *
 * @param {String} urlToRemove - line_item.url_to_remove
 * @param {Function} next - Callback, executed on success
 * @param {Function} onError - Callback, executed on error
 */

const removeFromCart = (urlToRemove, next, onError) => {
  if(!urlToRemove) return;

  fetch(urlToRemove)
    .then((res) => res.text())
    .then((cart) => {
      if(next) next(cart);
    })
    .catch((err) => onError ? onError(err) : console.error(err));
}

/**
 * Updates the number of items in the header cart link
 *
 * @param {String} headerHTML
 */

const changeHeaderLinkCount = (headerHTML) => {
  const currentItemCount = document.querySelector('.js-cart-count');
  if(!headerHTML || ! currentItemCount) return;

  const html = new DOMParser().parseFromString(headerHTML, 'text/html');
  const newItemCount = html.querySelector('.js-cart-count');
  if(!newItemCount) return;

  currentItemCount.innerHTML = newItemCount.innerHTML;
}

/**
 * Adds a product to the cart.
 *
 * @param {String} id - Variant id of the product
 * @param {Number} quantity - Quantity of the product
 * @param {Function} next - Callback (on success)
 * @param {Function} onError - Callback (in case of error)
*/

const addToCart = ({id, quantity = 1, next, onError}) => {
  if (!id) return

  const options = {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items: [{ id, quantity }], sections: 'header' }),
  }

  fetch(`${window.Shopify.routes.root}cart/add.js`, options)
    .then((res) => res.json())
    .then((data) => {
      if(data?.status && data?.description) return onError(data.description);
      if(data?.sections?.header) changeHeaderLinkCount(data.sections.header);
      if (next) return next();
    })
    .catch((err) => {
      console.error(err);
    });
}
