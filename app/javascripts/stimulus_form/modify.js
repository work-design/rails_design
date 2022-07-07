import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['input']

  plus() {
    this.inputTarget.value = parseInt(this.inputTarget.value) + 1
  }

  minus() {
    if (this.inputTarget.value >= 1) {
      this.inputTarget.value = parseInt(this.inputTarget.value) - 1
    }
  }

}
