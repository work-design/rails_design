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
    let countdown
    if (this.hasTimeValue) {
      countdown = this.timeValue
    } else {
      countdown = this.countTarget.innerText
    }

    let value
    if (this.countTarget instanceof HTMLInputElement) {
      value = this.countTarget.value
    } else {
      value = ''
    }
    this.setCount(value, countdown)
    this.resetCounter(value, countdown)
  }

  resetCounter(value, countdown) {
    if (this.timer) {
      clearInterval(this.timer)
    }

    this.timer = setInterval(() => {
      countdown--
      if (countdown <= 0) {
        clearInterval(this.timer)

        if (this.hasDisabledTarget) {
          this.disabledTarget.removeAttribute('disabled')
          this.disabledTarget.innerText = this.getValue
        }
        this.hiddenTargets.forEach(el => { el.remove() })

        if (this.reloadValue) {
          Turbo.visit(location.href, { action: 'replace' })
        }
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
      this.countTarget.innerText = countdown.toString().padStart(this.timeValue.toString().length, '0')
    }
  }
}
