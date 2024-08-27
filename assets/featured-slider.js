if (!customElements.get('featured-slider')) {
  class FeaturedSlider extends HTMLElement {
    constructor() {
      super();
    }

    destroySlider() {
      if(!this.slider) return;

      this.slider.destroy(true, true);
    }

    initSlider() {
      if(window.innerWidth < 990) return this.destroySlider();

      this.slider = new Swiper(this, {
        loop: true,
        centerInsufficientSlides: true,
        slidesPerView: 'auto',
      });
    }

    connectedCallback() {
      if(!Swiper) return;

      window.addEventListener('resize', () => {
        this.initSlider();
      });

      this.initSlider();
    }
  }
  customElements.define('featured-slider', FeaturedSlider);
}
