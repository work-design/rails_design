import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    time: { type: Number, default: 60 },
    get: { type: String, default: '获取验证码' }
  }
  static targets = ['count', 'hidden', 'disabled']

  connect() {
    this.countDown()
  }

  countDown() {
    let countdown = this.timeValue
    let value
    if (this.countTarget instanceof HTMLInputElement) {
      value = this.countTarget.value
    } else {
      value = ''
    }
    this.setCount(value, countdown)

    let timer = setInterval(() => {
      countdown--
      if (countdown <= 0) {
        if (this.hasDisabledTarget) {
          this.disabledTarget.removeAttribute('disabled')
        }
        this.setCount(value, this.getValue)
        this.hiddenTargets.forEach(el => { el.remove() })
        clearInterval(timer)
      } else {
        this.setCount(value, countdown)
      }
    }, 1000, countdown)
  }

  setCount(text, countdown) {
    if (this.countTarget instanceof HTMLInputElement) {
      if (countdown <= 0) {
        this.countTarget.value = `${text}`
      } else {
        this.countTarget.value = `${text} ${countdown}秒`
      }
    } else {
      this.countTarget.innerText = countdown
    }
  }
}
