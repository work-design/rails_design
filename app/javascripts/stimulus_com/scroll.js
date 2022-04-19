import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    this.scroll()
  }

  scroll() {
    if (sessionStorage.getItem('scrollTop')) {
      this.element.scrollTo(0, sessionStorage.getItem('scrollTop'))
      sessionStorage.removeItem('scrollTop')
    }
  }

}
