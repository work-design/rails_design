import { Controller } from 'stimulus'

// data-controller="visit"
class VisitController extends Controller {
  static values = {
    url: String,
    frame: String,
    headers: Object
  }

  connect() {
    console.debug('connected:', this.identifier)

    if (this.hasFrameValue) {
      this.visit()
    } else {
      this.addEvent(this.headersValue)
      //this.topVisit()
    }

    this.headersValue = {a:1, b: '2'}
    document.documentElement.classList.remove('is-clipped')
    //this.element.remove()
  }

  addEvent(headers) {
    document.addEventListener('turbo:before-fetch-request', event => {
      let xhr = event.detail.fetchOptions
      Object.assign(xhr.headers, headers)
    }, { once: true })
  }

  topVisit() {
    if (this.hasUrlValue) {
      Turbo.visit(this.urlValue, { action: 'replace' })
    } else {
      Turbo.visit(location.href, { action: 'replace' })
    }
  }

  visit() {
    this.modal.visit(this.urlValue)
  }

  get modal() {
    return document.getElementById(this.frameValue).delegate
  }

}

application.register('visit', VisitController)
