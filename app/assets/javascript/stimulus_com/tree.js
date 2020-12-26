import { Controller } from 'stimulus'

class TreeController extends Controller {

  connect() {
    console.debug('Tree Controller works!')
  }

  collapse(event) {
    let ele = event.currentTarget
    let par = ele.parentNode.parentNode

    let el = par.nextElementSibling
    while (el && el.dataset['depth'] !== par.dataset['depth'] && par.dataset['depth'].endsWith(el.dataset['depth'])) {
      el.style.display = 'none'
      el = el.nextElementSibling
    }

    ele.classList.replace('fa-caret-down', 'fa-caret-right')
    ele.dataset['action'] = 'click->tree#expand'
  }

  expand(event) {
    let ele = event.currentTarget
    let par = ele.parentNode.parentNode

    let el = par.nextElementSibling
    while (el && el.dataset['depth'] !== par.dataset['depth'] && par.dataset['depth'].endsWith(el.dataset['depth'])) {
      el.style.display = 'table-row'
      el = el.nextElementSibling
    }

    ele.classList.replace('fa-caret-right', 'fa-caret-down')
    ele.dataset['action'] = 'click->tree#collapse'
  }

}

application.register('tree', TreeController)
