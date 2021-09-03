import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['item']

  collapse(event) {
    const ele = event.currentTarget
    const par = this.itemTarget

    let el = par.nextElementSibling
    while (el && el.dataset['depth'] !== par.dataset['depth'] && par.dataset['depth'].endsWith(el.dataset['depth'])) {
      el.style.display = 'none'
      el = el.nextElementSibling
    }

    ele.classList.replace('fa-caret-down', 'fa-caret-right')
    ele.dataset['action'] = 'click->tree#expand'
  }

  expand(event) {
    const ele = event.currentTarget
    const par = this.itemTarget

    let el = par.nextElementSibling
    while (el && el.dataset['depth'] !== par.dataset['depth'] && par.dataset['depth'].endsWith(el.dataset['depth'])) {
      el.style.display = 'table-row'
      el = el.nextElementSibling
    }

    ele.classList.replace('fa-caret-right', 'fa-caret-down')
    ele.dataset['action'] = 'click->tree#collapse'
  }

}
