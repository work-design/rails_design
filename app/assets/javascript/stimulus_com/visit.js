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
      this.addEvent()
      this.topVisit()
    }

    document.documentElement.classList.remove('is-clipped')
    this.element.remove()
  }

  topVisit() {
    if (this.hasUrlValue) {
      Turbo.visit(this.urlValue, { action: 'replace' })
    } else {
      Turbo.visit(location.href, { action: 'replace' })
    }
  }

  addEvent() {
    document.addEventListener('turbo:before-fetch-request', event => {
      let xhr = event.detail.fetchOptions
      xhr.headers['Utc-Offset'] = (new Date).getTimezoneOffset()
    }, { once: true })
  }

  visit() {
    this.modal.visit(this.urlValue)
  }

  get modal() {
    return document.getElementById(this.frameValue).delegate
  }

}

application.register('visit', VisitController)
