import { Controller } from '@hotwired/stimulus'

export default class extends Controller {


  appear(event) {
    this.element.classList.toggle('is-active')
  }

}
