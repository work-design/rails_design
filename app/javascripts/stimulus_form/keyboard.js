import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    id: String
  }

  enter(event) {
    const element = event.currentTarget

    this.input.value = this.input.value.concat(element.innerText)
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
