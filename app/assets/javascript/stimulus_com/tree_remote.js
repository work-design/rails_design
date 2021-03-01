import { Controller } from 'stimulus'

class TreeRemoteController extends Controller {
  static targets = ['item', 'checkbox']
  static values = { hide: Boolean }

  connect() {
    console.debug('Tree Remote Controller works!')

    if (this.hideValue) {
      this.collapseDirect()
    }
  }

  collapseDirect() {
    let el = this.element.nextElementSibling
    while (el && el.id.startsWith(this.element.id)) {
      el = el.nextElementSibling
      el.previousElementSibling.remove()
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
    let ele = event.currentTarget
    let par = this.itemTarget
    ele.parentNode.addEventListener('click', this.disableLink)

    let el = par.nextElementSibling
    while (el && el.id.startsWith(par.id)) {
      el = el.nextElementSibling
      el.previousElementSibling.remove()
    }

    this.collapseCheckbox()
    ele.classList.replace('fa-caret-down', 'fa-caret-right')
    ele.dataset['action'] = 'click->tree-remote#expand'
  }

  expand(event) {
    let ele = event.currentTarget
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

application.register('tree-remote', TreeRemoteController)
