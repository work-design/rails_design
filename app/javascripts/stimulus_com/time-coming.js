import TimeCountController from './time-count'
import {DateTime} from "luxon";
window.Duration = Duration

export default class extends TimeCountController {
  static values = {
    time: String
  }

  connect() {
    this.countDown()
  }

  countDown() {
    const time = DateTime.fromISO(this.timeValue)
    this.count(time, DateTime.now())

    const timer = setInterval(() => {
      result = result.minus({ seconds: 1 })
      for (const [index, value] of Object.values(result.values).entries()) {
        if (value > 0) {
          result_format = format.slice(index)
          break
        }
      }
      console.log('---------', result.toObject(), result_format)

      if (result <= 0) {
        this.element.textContent = result.toFormat(result_format.join(''))
        clearInterval(timer)
      } else {
        this.element.textContent = result.toFormat(result_format.join(''))
      }
    }, 1000, result)
  }

}
