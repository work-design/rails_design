import { Controller } from '@hotwired/stimulus'
import { DateTime, Duration } from 'luxon'
window.Duration = Duration

export default class extends Controller {
  static values = {
    time: String
  }

  connect() {
    this.countDown()
  }

  countDown() {
    const time = DateTime.fromISO(this.timeValue)
    let result = time.diff(DateTime.now(), ['days', 'hours', 'minutes', 'seconds'])

    let timer = setInterval(() => {
      result = result.minus({ seconds: 1 })
      window.xxx = result
      if (result <= 0) {
        this.element.textContent = result.toFormat('d 天 h 时 mm 分 ss 秒')
        clearInterval(timer)
      } else {
        this.element.textContent = result.toFormat('d 天 h 时 mm 分 ss 秒')
      }
    }, 1000, result, this.element)
  }
}
