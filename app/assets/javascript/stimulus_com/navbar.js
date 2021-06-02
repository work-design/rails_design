import { Controller } from 'stimulus'

class NavbarController extends Controller {
  static targets = ['menu']

  connect() {
    console.debug('connected:', this.identifier)
  }

  toggle(element) {
    element.currentTarget.classList.toggle('is-active')
    this.menuTarget.classList.toggle('is-active')
  }

}

application.register('navbar', NavbarController)
