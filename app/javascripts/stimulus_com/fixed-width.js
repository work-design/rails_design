import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    this.element.style.width = `${this.element.getBoundingClientRect().width}px`
  }

}
