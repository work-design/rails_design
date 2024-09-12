import { Controller } from '@hotwired/stimulus'
import { DateTime, Duration } from 'luxon'
window.Duration = Duration

export default class extends Controller {
  static values = {
    time: String,
    diff: { type: Array, default: ['years', 'months', 'days', 'hours', 'minutes', 'seconds'] }
  }

  connect() {
    this.count()
  }

  count() {
    const time = DateTime.fromISO(this.timeValue)
    const now = DateTime.now()
    let result
    if (time > now) {
      result = time.diff(now, this.diffValue)
    } else {
      result = now.diff(time, this.diffValue)
    }
    let format = ['y年', 'M月', 'd天', 'h时', 'mm分', 'ss秒']
    let result_format

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
