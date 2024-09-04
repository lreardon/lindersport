
if (!customElements.get('product-form')) {
  class ProductForm extends HTMLElement {
    constructor() {
      super()
    }


    /**
     * Changes the variant title based on the selected variant (option)
     *
     * @param {HTMLOptionElement} option
     */

    updateVariantTitle(option) {
      const variantTitleElement = document.querySelector('.js-variant-title')
      if (!variantTitleElement || !option) return
      variantTitleElement.textContent =
        option.dataset.title ?? option.textContent
    }

    /**
     * Replaces the current price with the new variant's (option) price.
     *
     * @param {String} price
     * @returns
     */

    updatePrice(price) {
      const priceElement = document.querySelector('.js-price')
      if (!price || !priceElement) return
      priceElement.textContent = price
    }

    updateText(option) {
      this.updateVariantTitle(option)
      this.updatePrice(option?.dataset?.price)
    }

    /**
     * Changes the button state depending on the state parameter passed.
     * 'added', 'disabled', 'sold-out': Make the button disabled and change the text, defaults to making the button enabled and setting the text to 'Add to cart'.
     *
     * @param {String} state: Accepts: 'added', 'disabled', 'sold-out'
     * @returns
     */

    toggleButtonState(state) {
      if (!this.button) return

      this.button.setAttribute('disabled', '')

      switch (state) {
        case 'added':
          this.button.innerHTML = this.button.dataset.added ?? 'Added to cart'
          setTimeout(() => {
            this.toggleButtonState('enabled')
          }, 1500)
          break
        case 'disabled':
          break
        case 'sold-out':
          this.button.innerHTML = this.button.dataset.soldOut ?? 'Sold out'
          break
        default:
          this.button.removeAttribute('disabled')
          this.button.innerHTML = this.button.dataset.add ?? 'Add to cart'
          break
      }
    }

    /**
     * Generates the selector for the new option based on the {@link selectedOptionValues}.
     *
     * @returns {String}
     */

    getSelector() {
      let selector = ''

      for (const key in this.selectedOptionValues) {
        if (!this.selectedOptionValues[key]) continue

        selector += `[data-${key}="${this.selectedOptionValues[key]}"]`
      }

      return selector
    }

    /**
     * Sets the new variant ID in the URL and pushes the new URL into history.
     *
     * @param {Number} variantId - The current variant ID
     */

  updateURL(variantId) {
  if (!variantId) return;
    // const lastSection = sessionStorage.getItem('currentSection');
  // console.log('lastSection:', lastSection);
  var url = new URL(window.location.toString());

  var searchParams = url.searchParams;
  searchParams.set('variant', variantId);
  url.search = searchParams.toString();

  var newUrl = url.toString();
      
  history.pushState({}, '', newUrl);
// This function encapsulates the scrolling logic
// function navigateToLastSection() {
//   console.log('__NavigateToLast called')
//   const lastSection = sessionStorage.getItem('currentSection');
//   if (lastSection) {
//     setTimeout(() => {
//       const targetSection = document.getElementById(lastSection);
//       if (targetSection) {
//         targetSection.scrollIntoView({ behavior: 'smooth' });
//       } else {
//         console.warn(`Section with id "${lastSection}" not found`);
//       }
//     }, 1000); // Adjust this delay as needed
//   }
// }
  // Call changeActiveSlide function if it exists
  if (typeof changeActiveSlide === 'function') {
    changeActiveSlide(variantId);
    console.log('changeActiveSlide called with variantId:', variantId);
  }

  // Add event listener for popstate event
  let redirectScheduled = false;
  // due to the product form using history api to switch between variants of products, setTimeout is necessary to await the navigation to homepage until after the client-side nav happens. 
  // ideally refactor to prevent navigation with conditional logic to prevent navigation with history.pushState({}, '', newUrl); on popstate/backbutton event
window.addEventListener('popstate', function() {
  console.log('__Popstate event triggered');
  event.preventDefault();
  if (!redirectScheduled) {
    redirectScheduled = true;
    setTimeout(function() {
      // console.log('Redirecting to root page');
      // const lastSection = sessionStorage.getItem('currentSection');
      // console.log('lastSection on popstate:', lastSection);
      
      // Use history.pushState to change the URL without reloading the page
      // const pushed = `/#${lastSection}`;
      window.location.href = `/#${lastSection}`;
      
      // Dispatch a custom event to notify your app of the change
            setTimeout(navigateToLastSection, 500); // Adjust this delay as needed

      window.dispatchEvent(new CustomEvent('urlChanged', { detail: { url: newUrl } }));
      // setTimeout(navigateToLastSection, 2500); // Adjust this delay as needed
      redirectScheduled = false;
    }, 300);
  }
}, { once: true });
window.addEventListener('load', navigateToLastSection);
   }

    /**
     * Changes the current slide of the ProductGallery
     *
     * @param {Number} variantId - The current variant id
     */

    changeActiveSlide(variantId) {
      if (this.productGallery && this.productGallery?.changeActive) {
        this.productGallery.changeActive(variantId)
      }
    }

    /**
     * Changes the selected option based on the generated selector from {@link getSelector}, changes the submit button's state {@link toggleButtonState}, renders the new price / variant.title {@link updateText} and updates the current URL with the new variant id {@link updateUrl}
     */

    changeSelectedOption() {
      this.masterOption = this.querySelector(this.getSelector())
      if (!this.masterOption) return
      this.masterSelect.value = this.masterOption.value
      this.toggleButtonState(
        this.masterOption.dataset.available == 'false' ? 'sold-out' : 'enabled'
      )
      this.updateText(this.masterOption)
      this.updateURL(this.masterOption.value)
    }

    /**
     * Initializes the hidden master select and it's options. Saves the currently selected radios in {@link selectedOptionValues} for easier access
     */

    initMasterSelectAndOptions() {
      this.masterSelect = this.querySelector('.js-master-select')
      if (!this.masterSelect) return

      this.masterOption = this.masterSelect.selectedOptions[0]
      if (!this.masterOption) return

      this.selectedOptionValues = {
        option1: this.masterOption.dataset.option1,
        option2: this.masterOption.dataset.option2,
        option3: this.masterOption.dataset.option3,
      }

      this.changeActiveSlide(this.masterOption.value)

      this.addEventListener('change', (event) => {
        if (!(event.target instanceof HTMLInputElement)) return
        this.selectedOptionValues[`option${event.target.dataset.index}`] =
          event.target.value
        this.changeSelectedOption()
      })
    }

    /**
     * Changes the submit event to an AJAX request
     */

    setupFormAjax() {
      this.form = this.querySelector('form')
      if (!this.form) return

      this.form.addEventListener('submit', (event) => {
        event.preventDefault()
        this.toggleButtonState('disabled')
        addToCart({
          id: this.masterSelect.value,
          next: () => this.toggleButtonState('added'),
          onError: (errorText) => {
            const errorElement = this.querySelector('.js-error')
            if (!errorElement || !errorText) return
            errorElement.textContent = errorText
          },
        })
      })
    }

    /**
     * Replaces the old image (above the product details) with the one for the new variant
     *
     * @param {Document} html - A parsed HTML document containing the requested section.
     * @param {HTMLAnchorElement} swatch - The swatch element that was clicked on.
     */

    setNewImage(html, swatch) {
      const image = html.querySelector('.js-product-image img')
      const imageWrapper = document.querySelector('.js-product-image')
      const currentImage = document.querySelector('.js-product-image img')

      if (!currentImage || !image) return
      if (image.src == currentImage.src) return

      // Fades the current image out
      currentImage.classList.add('transition-fade-out')
      currentImage.classList.add('animation-fade-out')

      image.classList.add('transition-fade-in')
      // Fades in the new image
      image.addEventListener('load', () => {
        image.classList.add('animation-fade-in')
        safariResize([image])
      })

      // Timeout to make the fade out / fade in animations syncronized properly
      window.setTimeout(() => {
        imageWrapper.removeChild(currentImage)
        imageWrapper.appendChild(image)
        this.updateURL(swatch.getAttribute('href').split('?variant=')[1])
      }, 500)
    }

    /**
     * Replaces the old radio buttons with new ones and selects the radios with the same value as the old radio buttons.
     *
     * @param {Document} html - A parsed HTML document containing the requested section.
     */

    setNewOptions(html) {
      const newOptionsContainers = html.querySelectorAll('.js-product-options')
      const currentOptions = document.querySelectorAll('.js-product-options')
      const currentSelectedValues = {}

      currentOptions.forEach((option) => {
        const currentInput = option.querySelector('input:checked')
        if (currentInput.value)
          currentSelectedValues[option.dataset.index] = currentInput.value
      })

      newOptionsContainers.forEach((container) => {
        currentOptions[container.dataset.index - 1].innerHTML =
          container.innerHTML
      })

      for (const key in currentSelectedValues) {
        const input = this.querySelector(
          `[data-index="${key}"][value="${currentSelectedValues[key]}"]`
        )
        input.click()
      }

      const currentButton = this.querySelector('.js-button')
      const button = html.querySelector('.js-button')
      if (!button || currentButton) return

      this.appendChild(button)
    }

    setNewGallery(html) {
      const gallery = document.querySelector('product-gallery')
      const newGallery = html.querySelector('product-gallery')

      if (!gallery || !newGallery) return
      const parentElement = gallery.parentElement

      gallery.classList.add('transition-fade-out')
      gallery.classList.add('animation-fade-out')
      newGallery.classList.add('transition-fade-in')

      window.setTimeout(() => {
        parentElement.removeChild(gallery)
        parentElement.appendChild(newGallery)

        newGallery.classList.add('animation-fade-in')
        safariResize(newGallery.querySelectorAll('img'))
      }, 500)
    }

    setNewVariantTitle(html) {
      if (!html) return

      const newForm = html.querySelector('product-form')
      if (!newForm) return

      this.parentElement.appendChild(newForm)
      this.parentElement.removeChild(this)
    }

    /**
     * Initializes the event listener for the swatch elements. Fetches the main-product section from the variant with the same color as the swatch and renders new product options (radios) {@link setNewOptions} and the variant image {@link setNewImage}
     */

   initSwatches() {
  this.addEventListener('click', (event) => {
    const swatch = event.target.closest('.js-swatch')
    if (!swatch) return

    event.preventDefault()
    event.stopPropagation()

    fetch(swatch.getAttribute('href'), {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      } 
    })
      .then((res) => res.text())
      .then((data) => {
        const html = new DOMParser().parseFromString(data, 'text/html')

        this.setNewGallery(html)

        this.setNewImage(html, swatch)
        this.setNewOptions(html)
        this.setNewVariantTitle(html)
      })
      .catch((err) => console.error(err))
  })
}

    init() {
      this.button = this.querySelector('.js-product-submit')
      this.productGallery = document.querySelector('product-gallery')
      this.initMasterSelectAndOptions()
      this.setupFormAjax()
      this.initSwatches()
    }

    connectedCallback() {
      this.init()
    }
  }
  customElements.define('product-form', ProductForm)
}
