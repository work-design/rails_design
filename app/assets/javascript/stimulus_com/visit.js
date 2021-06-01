import { Controller } from 'stimulus'

// data-controller="visit"
class VisitController extends Controller {
  static values = {
    url: String,
    frame: String
  }

  connect() {
    console.debug(this.identifier, 'connected!')

    if (this.hasFrameValue) {
      this.visit()
    } else {
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

  visit() {
    this.modal.visit(this.urlValue)
  }

  get modal() {
    return document.getElementById(this.frameValue).delegate
  }

}

application.register('visit', VisitController)
