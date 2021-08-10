import { Controller } from 'stimulus'

// data-controller="notice"
export default class extends Controller {

  connect() {
    console.debug('connected:', this.identifier)
  }

  close() {
    this.element.remove()
  }

}
