import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    document.documentElement.classList.add('clipped')
  }

  close() {
    this.element.remove()
  }
}