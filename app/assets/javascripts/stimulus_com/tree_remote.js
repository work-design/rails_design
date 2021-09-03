import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['item', 'checkbox']
  static values = {
    hide: Boolean
  }

  connect() {
    if (this.hideValue) {
      this.collapseDirect()
    }
  }

  collapseDirect() {
    let el = this.element.nextElementSibling
    while (el && el.id.startsWith(this.element.id)) {
      let to_remove = el
      el = el.nextElementSibling
      to_remove.remove()
    }
  }

  collapseCheckbox() {
    this.checkboxTargets.forEach(el=> {
      if (el.elements['expand']) {
        el.elements['expand'].value = null
      }
    })
  }

  collapse(event) {
    const ele = event.currentTarget
    const par = this.itemTarget
    ele.parentNode.addEventListener('click', this.disableLink)

    let el = par.nextElementSibling
    while (el && el.id.startsWith(par.id)) {
      let to_remove = el
      el = el.nextElementSibling
      to_remove.remove()
    }

    this.collapseCheckbox()
    ele.classList.replace('fa-caret-down', 'fa-caret-right')
    ele.dataset['action'] = 'click->tree-remote#expand'
  }

  expand(event) {
    const ele = event.currentTarget
    ele.parentNode.removeEventListener('click', this.disableLink)

    ele.classList.replace('fa-caret-right', 'fa-caret-down')
    ele.dataset['action'] = 'click->tree-remote#collapse'
  }

  disableLink(event) {
    event.stopPropagation()
    event.preventDefault()

    return false
  }

}
