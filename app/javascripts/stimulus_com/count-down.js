import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    time: Number,
    get: { type: String, default: '获取验证码' },
    reload: { type: Boolean, default: false }
  }
  static targets = ['count', 'hidden', 'disabled']

  connect() {
    this.countDown()
  }

  countDown() {
    this.initCounter = this.defaultCounter()

    let value
    if (this.countTarget instanceof HTMLInputElement) {
      value = this.countTarget.value
    } else {
      value = ''
    }
    this.setCount(value, this.initCounter)
    this.resetCounter(value, this.initCounter)
  }

  resetCounter(value, countdown) {
    if (this.timer) {
      clearInterval(this.timer)
    }

    this.timer = setInterval(() => {
      countdown--
      if (countdown <= 0) {
        if (this.hasDisabledTarget) {
          this.disabledTarget.removeAttribute('disabled')
          this.disabledTarget.innerText = this.getValue
        }
        this.hiddenTargets.forEach(el => { el.remove() })

        if (this.reloadValue) {
          Turbo.visit(location.href, { frame: 'box' })
        }

        clearInterval(this.timer)
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
      this.countTarget.innerText = countdown.toString().padStart(this.initCounter.toString().length, '0')
    }
  }

  defaultCounter() {
    if (this.hasTimeValue) {
      return this.timeValue
    } else {
      return parseInt(this.countTarget.innerText)
    }
  }
}
