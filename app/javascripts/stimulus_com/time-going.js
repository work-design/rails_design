import TimeCountController from './time-count'
import {DateTime} from "luxon";

export default class extends TimeCountController {
  static values = {
    time: String
  }

  connect() {
    this.countUp()
  }

  countUp() {
    const time = DateTime.fromISO(this.timeValue)

    this.count(DateTime.now(), time)
  }
}
