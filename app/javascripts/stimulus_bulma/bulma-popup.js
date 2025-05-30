import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['popup']

  connect() {
    //document.documentElement.classList.add('clipped')
  }

  close(e) {
    e.currentTarget.remove()
    this.popupTarget.remove()
  }
}