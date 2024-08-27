if (!customElements.get('product-gallery')) {
  class ProductGallery extends HTMLElement {
    constructor() {
      super()
    }

    changeActive(variantId) {
      if (!variantId || !this.slider) return
    }

    getNumberOfSlides() {
      return this.querySelectorAll('.swiper-slide').length
    }

    initSlider(startingIndex = 0, hasMousewheel = true) {
      const options = {
        initialSlide: startingIndex,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        passiveListeners: false,
        touchMoveStopPropagation: true,
        speed: 600,
      }

      if (hasMousewheel) {
        options.mousewheel = {}
        options.mousewheel.releaseOnEdges = true
        // options.mousewheel.eventsTarget = this.closest('section')
      }

      this.slider = new Swiper(this, options)
    }

    toggle() {
      if (!this.slider) return
      if (window.scrollY == 0) this.slider.mousewheel.enable()
      if (window.scrollY > 0) this.slider.mousewheel.disable()
    }

    connectedCallback() {
      if (this.getNumberOfSlides() <= 1 || !Swiper) return

      this.initSlider()

      if (!this.slider) return

      this.slider.on('slideChangeTransitionEnd', () => {
        if (!this.slider.isEnd) return

        this.slider.mousewheel.enable()
      })

      window.addEventListener('scroll', (event) => {
        if (!this.slider) return
        return this.toggle()

        if (window.scrollY == 0) return this.slider.mousewheel.enable()
        if (window.scrollY > 0) return this.slider.mousewheel.disable()
      })

      this.slider.on('scroll', (event) => {
        return this.toggle()
      })
    }

    disconnectedCallback() {
      if (!this.slider) return

      this.slider.destroy(true, true)
      this.slider = null
    }
  }

  customElements.define('product-gallery', ProductGallery)
}
