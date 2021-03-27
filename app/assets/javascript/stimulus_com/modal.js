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
  }

  // turbo:frame-render->modal#loaded
  loaded() {
    this.element.classList.add('is-active')
  }

}

application.register('modal', ModalController)
