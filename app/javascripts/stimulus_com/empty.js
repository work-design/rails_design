import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['content']

  connect() {
    if (this.hasContentTarget && this.contentTarget.childElementCount <= 0) {
      this.element.remove()
    }
  }

}
