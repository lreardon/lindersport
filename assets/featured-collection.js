if (!customElements.get('featured-collection')) {
  class FeaturedCollection extends HTMLElement {
    constructor() {
      super();
    }

    removeFixedPosition(targetSection) {
      targetSection.classList.remove('is-fixed');
      targetSection.parentElement.style.removeProperty('padding-top');
      targetSection.parentElement.style.removeProperty('margin-bottom');
    }

    setFixedPosition() {
      const targetSection = document.querySelector('.js-target-section');

      if (!targetSection) return;

      if (window.innerWidth > 990) return this.removeFixedPosition(targetSection);

      targetSection.classList.add('is-fixed');
      targetSection.parentElement.style.paddingTop = `${targetSection.scrollHeight}px`;
      targetSection.parentElement.style.marginBottom = 'calc(var(--header-bottom-position, 0) * -1)';
    }

    connectedCallback() {
      window.setTimeout(() => {
        this.setFixedPosition();
      }, 0);

      window.addEventListener('resize', () => {
        this.setFixedPosition();
      });
    }
  }

  customElements.define('featured-collection', FeaturedCollection);
}
