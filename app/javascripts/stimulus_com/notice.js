import { Controller } from '@hotwired/stimulus'

// data-controller="notice"
export default class extends Controller {
  static targets = ['progress']
  static values = {
    duration: { type: Number, default: 5 }
  }

  connect() {
    this.element.style.animationDuration = `${this.durationValue}s`
    if (this.hasProgressTarget) {
      let count = 100
      const rate = this.durationValue * 1000 / count
      this.timer = setInterval(() => {
        count--
        this.progressTarget.value = count
        if (count <= 0) {
          clearInterval(this.timer)
        }
      }, rate)
    }
  }

  close() {
    this.element.remove()
  }

  disconnect() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

}
