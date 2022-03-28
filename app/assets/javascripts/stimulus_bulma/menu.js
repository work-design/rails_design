import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  static values = {
    openClass: String,
    closeClass: String,
  }

  toggle() {
    this.element.classList.toggle('is-active')
  }

  expand(event) {
    let expander = event.currentTarget
    if (expander.nextElementSibling !== null) {
      expander.nextElementSibling.classList.toggle('is-hidden')
    }
    if (expander.lastElementChild !== null) {
      expander.lastElementChild.classList.toggle(this.closeClass)
      expander.lastElementChild.classList.toggle(this.openClass)
    }
  }

  get closeClass() {
    return this.openClassValue || 'fa-angle-left'
  }

  get openClass() {
    return this.closeClassValue || 'fa-angle-down'
  }

}