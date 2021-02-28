import { Controller } from 'stimulus'

// data-controller="visit"
class VisitController extends Controller {
  static values = { url: String }

  connect() {
    console.debug('Common Controller works!')

    let request = Turbo.navigator.currentVisit.request
    if (this.hasUrlValue) {
      request.url = new URL(this.urlValue)
    }
    request.perform()

    document.documentElement.classList.remove('is-clipped')

    this.element.remove()
  }

}

application.register('visit', VisitController)
