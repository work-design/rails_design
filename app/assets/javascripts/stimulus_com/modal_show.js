import { Controller } from 'stimulus'

// data-controller="modal_show"
export default class extends Controller {

  connect() {
    console.debug('connected:', this.identifier)

    this.modal.classList.add('is-active')
    document.documentElement.classList.add('is-clipped')
    this.element.remove()
  }

  get modal() {
    return document.getElementById('modal').parentNode.parentNode
  }

}
