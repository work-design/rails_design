import { Controller } from 'stimulus'

export default class extends Controller {
  static values = {
    time: Number
  }

  connect() {
    console.debug('connected:', this.identifier)
    this.countDown()
  }

  countDown() {
    let countdown = this.timeValue || 60
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
    }, 1000, countdown, this.element)
  }
}
