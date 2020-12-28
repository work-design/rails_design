import { Controller } from 'stimulus'

// data-controller="modal"
class ModalController extends Controller {

  connect() {
    console.debug('Modal Controller works!')
    document.documentElement.classList.add('is-clipped')
    console.debug(document.referrer)
  }

  close() {
    this.element.remove()
    document.documentElement.classList.remove('is-clipped')
  }

}

application.register('modal', ModalController)
