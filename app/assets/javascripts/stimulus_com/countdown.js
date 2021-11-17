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
    let result = DateTime.now().diff(time, ['days', 'hours', 'minutes', 'seconds'])

    let timer = setInterval(() => {
      result = result.minus({ seconds: 1 })
      if (result <= 0) {
        this.element.textContent = result.toFormat('hh:mm:ss')
        clearInterval(timer)
      } else {
        this.element.textContent = result.toFormat('hh:mm:ss')
      }
    }, 1000, result, this.element)
  }
}
