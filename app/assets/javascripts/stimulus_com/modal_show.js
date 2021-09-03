import { Controller } from '@hotwired/stimulus'

// data-controller="modal_show"
export default class extends Controller {

  connect() {
    this.modal.classList.add('is-active')
    document.documentElement.classList.add('is-clipped')
    this.element.remove()
  }

  get modal() {
    return document.getElementById('modal').parentNode.parentNode
  }

}
