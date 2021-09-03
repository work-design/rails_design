import { Controller } from '@hotwired/stimulus'

// data-controller="notice"
export default class extends Controller {

  close() {
    this.element.remove()
  }

}
