import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['input']
  static values = {
    step: { type: Number, default: 1 }
  }

  plus() {
    this.inputTarget.value = Number(parseFloat(this.inputTarget.value || 0) + this.step).toFixed(this.digit)
  }

  minus() {
    if (this.inputTarget.value >= this.step) {
      this.inputTarget.value = Number(parseFloat(this.inputTarget.value || 0) - this.step).toFixed(this.digit)
    }
  }

  get step() {
    return parseFloat(this.inputTarget.step) || this.stepValue
  }

  get digit() {
    return String(this.step).split('.')[1]?.length || 0
  }

}
