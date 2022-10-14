import { Controller } from '@hotwired/stimulus'
import { DateTime } from 'luxon'
window.DateTime = DateTime

// data-controller="time"
export default class extends Controller {
  static values = {
    localized: Boolean,
    datetime: String
  }

  connect() {
    this.parse()
  }

  parse() {
    if (this.localizedValue) {
      return
    }
    let str
    if (this.hasDatetimeValue && this.datetimeValue) {
      str = this.datetimeValue
    } else if (this.element.innerText.length > 0) {
      str = this.element.innerText
    } else {
      return
    }

    const format_str = this.element.dataset['format'] || 'yyyy-MM-dd HH:mm'
    const time = DateTime.fromISO(str)
    this.element.innerText = time.toFormat(format_str)
    this.localizedValue = true
  }

}
