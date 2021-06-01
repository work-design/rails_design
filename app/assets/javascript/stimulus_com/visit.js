import { Controller } from 'stimulus'

// data-controller="visit"
class VisitController extends Controller {
  static values = {
    url: String
  }

  connect() {
    console.debug(this.identifier, 'connected!')

    if (this.hasUrlValue) {
      Turbo.visit(this.urlValue, { action: 'replace' })
    } else {
      Turbo.visit(location.href, { action: 'replace' })
    }

    document.documentElement.classList.remove('is-clipped')
    this.element.remove()
  }

  visit() {
    this.modal.visit(this.urlValue)
  }

  get modal() {
    return document.getElementById('modal').delegate
  }

}

application.register('visit', VisitController)
