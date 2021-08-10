import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['menu']

  connect() {
    console.debug('connected:', this.identifier)
  }

  toggle(element) {
    element.currentTarget.classList.toggle('is-active')
    this.menuTarget.classList.toggle('is-active')
  }

}
