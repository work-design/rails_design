import { Controller } from 'stimulus'

// data-controller="modal"
class ModalController extends Controller {

  connect() {
    console.debug(this.identifier, 'connected!')
    console.debug('modal refer:', document.referrer)
  }

  close() {
    this.element.classList.remove('is-active')
    document.documentElement.classList.remove('is-clipped')
    this.modal.removeAttribute('src')
  }

  // turbo:frame-load->modal#loaded
  loaded() {
    this.element.classList.add('is-active')
  }

  get modal() {
    return document.getElementById('modal')
  }

}

application.register('modal', ModalController)
