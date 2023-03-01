import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    id: String,
    digit: Number
  }

  enter(event) {
    const element = event.currentTarget
    const value = this.input.value.concat(element.innerText)

    if (this.hasDigitValue) {
      if (value.includes('.')) {
        let [left, right] = value.split('.')
        if (right.length > this.digitValue) {
          this.input.value = [left, right.slice(0, this.digitValue)].join('.')
        } else {
          this.input.value = value
        }
      } else {
        this.input.value = value
      }
    } else {
      this.input.value = value
    }
  }

  dot() {
    if (this.input.value.includes('.')) {

    } else if (this.input.value === '') {
      this.input.value = '0.'
    } else {
      this.input.value = this.input.value.concat('.')
    }
  }

  backspace() {
    this.input.value = this.input.value.slice(0, -1)
  }

  get input() {
    return document.getElementById(this.idValue)
  }
}
