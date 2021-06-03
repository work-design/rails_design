import { Controller } from 'stimulus'

// data-controller="modal_show"
class ModalShowController extends Controller {

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

application.register('modal-show', ModalShowController)
