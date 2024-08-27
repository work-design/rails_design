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
    this.countTarget.innerText = countdown

    let timer = setInterval(() => {
      countdown--
      if (countdown <= 0) {
        if (this.hasDisabledTarget) {
          this.disabledTarget.removeAttribute('disabled')
        }
        this.countTarget.innerText = this.getValue
        this.hiddenTargets.forEach(el => { el.remove() })
        clearInterval(timer)
      } else {
        this.countTarget.innerText = countdown
      }
    }, 1000, countdown)
  }
}
