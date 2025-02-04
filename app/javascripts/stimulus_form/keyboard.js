import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['submit']
  static values = {
    id: String,
    dot: String,
    digit: Number
  }

  enter(event) {
    const element = event.currentTarget
    let value

    if (this.dotElement.hidden) {
      value = this.input.value.concat(element.innerText)
    } else {
      value = this.input.value.concat('.', element.innerText)
      this.dotElement.hidden = true
    }

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

    if (this.input.valueAsNumber > 0) {
      this.submitTarget.disabled = false
    }

    this.input.dispatchEvent(new Event('input'))
  }

  zeroEnter(event) {
    if (this.input.valueAsNumber !== 0 || this.dotElement.hidden === false) {
      this.enter(event)
    }
  }

  dot() {
    if (this.input.value.includes('.')) {

    } else if (this.input.value === '') {
      this.input.value = '0'
      this.dotElement.hidden = false
    } else {
      this.dotElement.hidden = false
    }
  }

  backspace() {
    this.input.value = this.input.value.slice(0, -1)
    if (this.input.value === '') {
      this.dotElement.hidden = true
    }
  }

  get input() {
    return document.getElementById(this.idValue)
  }

  get dotElement() {
    return document.getElementById(this.dotValue)
  }
}
