import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['content']

  connect() {
    if (this.hasContentTarget && this.contentTarget.childElementCount < 1) {
      this.element.remove()
    } else if (this.element.childElementCount < 1) {
      this.element.remove()
    }
  }

}
