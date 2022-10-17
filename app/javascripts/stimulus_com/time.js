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

    if (this.str) {
      const time = DateTime.fromISO(this.str)
      this.element.innerText = time.toFormat(this.format)
      this.localizedValue = true
    }
  }

  get str() {
    if (this.hasDatetimeValue && this.datetimeValue) {
      return this.datetimeValue
    } else if (this.element.innerText.length > 0) {
      return this.element.innerText
    }
  }

  // xx => 'yyyy-MM-dd HH:mm:ss'
  get format() {
    let fmt = this.element.dataset['format']
    if (fmt === 'human') {
      return 'yyyy-MM-dd HH:mm:ss'
    } else {
      return fmt || 'yyyy-MM-dd HH:mm'
    }
  }

}
