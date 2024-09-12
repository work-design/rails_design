import { Controller } from '@hotwired/stimulus'
import { DateTime, Duration } from 'luxon'
window.Duration = Duration

export default class extends Controller {
  static values = {
    time: String
  }

  countUp() {
    const time = DateTime.fromISO(this.timeValue)
    let result = DateTime.now().diff(time, ['days', 'hours', 'minutes', 'seconds'])
    let format = ['d天', 'h时', 'mm分', 'ss秒']
    let result_format

    const timer = setInterval(() => {
      result = result.plus({ seconds: 1 })
      for (const [index, value] of Object.values(result.values).entries()) {
        if (value > 0) {
          result_format = format.slice(index)
          break
        }
      }

      if (result <= 0) {
        this.element.textContent = result.toFormat(result_format.join(''))
        clearInterval(timer)
      } else {
        this.element.textContent = result.toFormat(result_format.join(''))
      }
    }, 1000, result, this.element)
  }
}
