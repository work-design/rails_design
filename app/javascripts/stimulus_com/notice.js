import { Controller } from '@hotwired/stimulus'

// data-controller="notice"
export default class extends Controller {
  static values = {
    duration: { type: Number, default: 5 }
  }

  connect() {
    this.xx()
  }

  close() {
    this.element.remove()
  }

  xx() {
    this.element.style.animationDuration = `${this.durationValue}s`
  }

}
