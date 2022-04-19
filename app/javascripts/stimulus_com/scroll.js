import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    this.scroll()
  }

  scroll() {
    if (sessionStorage.getItem('scrollTop')) {
      if (sessionStorage.getItem('scrollTopItem')) {
        const ele = document.getElementById(sessionStorage.getItem('scrollTopItem'))
        ele.scrollTo(0, sessionStorage.getItem('scrollTop'))
      } else {
        document.scrollingElement.scrollTo(0, sessionStorage.getItem('scrollTop'))
      }
    }

    sessionStorage.removeItem('scrollTop')
    sessionStorage.removeItem('scrollTopItem')
  }

}
