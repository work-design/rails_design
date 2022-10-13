import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    time: { type: Number, default: 60 }
  }

  connect() {
    this.countDown()
  }

  countDown() {
    let countdown = this.timeValue
    this.element.innerText = '重新发送(' + countdown + ')'

    let timer = setInterval(() => {
      countdown--
      if (countdown <= 0) {
        this.element.removeAttribute('disabled')
        this.element.innerText = '获取验证码'
        clearInterval(timer)
      } else {
        this.element.innerText = '重新发送(' + countdown + ')'
      }
    }, 1000, countdown)
  }
}
