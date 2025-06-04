import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    if (this.element.pathname === location.pathname) {
      this.element.classList.add('is-active')
    }
  }

}
