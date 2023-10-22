import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    content: String
  }

  next() {
    if (this.element.nextElementSibling) {
      this.element.nextElementSibling.scrollIntoView()
    }
  }

}
