import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    partial: { type: Boolean, default: false }
  }

  connect() {
    if (this.partialValue) {
      this.element.indeterminate = true
    }
  }

}
