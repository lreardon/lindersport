if (!customElements.get('contact-form')) {
  class ContactForm extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.form = this.querySelector('form');
      this.submit = this.querySelector('[type="submit"]');

      if(!this.form || !this.submit) return;

      this.submit.addEventListener('click', (event) => {
        event.preventDefault();

        const action = this.form.getAttribute('action');

        fetch(action, { method: 'POST' })
          .then((res) => res.text())
          .then((data) => {
            if(!this.dataset.success) return;

            this.innerHTML = `<p class="center">${this.dataset.success}</p>`;
          })
          .catch((err) => console.error(err));
      });
    }
  }
  customElements.define('contact-form', ContactForm);
}
