import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['input']
  static values = {
    step: { type: Number, default: 1 },
    total: Number,
    quantity: String
  }

  plus() {
    this.inputTarget.value = Number(parseFloat(this.inputTarget.value || 0) + this.step).toFixed(this.digit)
    if (this.hasQuantityValue) {
      this.doDivide(this.inputTarget.value)
    }
  }

  minus() {
    if (this.inputTarget.value >= this.step) {
      this.inputTarget.value = Number(parseFloat(this.inputTarget.value || 0) - this.step).toFixed(this.digit)
      if (this.hasQuantityValue) {
        this.doDivide(this.inputTarget.value)
      }
    }
  }

  divide(event) {
    this.doDivide(event.currentTarget.value)
  }

  doDivide(value) {
    if (value != 0) {
      this.quantity.innerText = Math.floor(this.totalValue / value)
    }
  }

  get quantity() {
    return document.getElementById(this.quantityValue)
  }

  get step() {
    return parseFloat(this.inputTarget.step) || this.stepValue
  }

  get digit() {
    return String(this.step).split('.')[1]?.length || 0
  }

}
