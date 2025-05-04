import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  static values = {
    openClass: String,
    closeClass: String,
  }

  toggle() {
    this.element.classList.toggle('is-active')
  }

  enter(event) {
    const ele = event.currentTarget
    Array.from(ele.closest('.menu-list').children).forEach(el => {
      if (el.tagName !== 'A') {
        el = el.firstElementChild
      }
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active')
      }
    })
    ele.classList.add('is-active')
  }

  expand(event) {
    let expander = event.currentTarget
    if (expander.nextElementSibling !== null) {
      expander.nextElementSibling.classList.toggle('display-none')
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
