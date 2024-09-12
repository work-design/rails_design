import TimeCountController from './time-count'

export default class extends TimeCountController {
  static values = {
    time: String
  }

  connect() {
    this.countUp()
  }

  countUp() {
    this.count()
  }
}
