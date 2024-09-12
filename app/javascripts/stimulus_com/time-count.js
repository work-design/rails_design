import { Controller } from '@hotwired/stimulus'
import { DateTime, Duration } from 'luxon'
window.Duration = Duration

export default class extends Controller {
  static values = {
    time: String,
    xx: { type: Object, default: ['days', 'hours', 'minutes', 'seconds'] }
  }

  connect() {
    this.count()
  }

  count() {
    const time = DateTime.fromISO(this.timeValue)
    let result
    if (time > DateTime.now()) {
      result = time.diff(finish, this.xxValue)
    } else {
      result = x
    }

    let format = ['d天', 'h时', 'mm分', 'ss秒']
    let result_format = ['d天', 'h时', 'mm分', 'ss秒']

    const timer = setInterval(() => {
      let step
      if (result > 0) {
        step = 1
      } else {
        step = -1
      }
      result = result.plus({ seconds: step })
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
    }, 1000, result)
  }
}
