import { Controller } from '@hotwired/stimulus'
import { DateTime } from 'luxon'
window.DateTime = DateTime

// data-controller="time"
export default class extends Controller {
  static values = {
    localized: Boolean
  }

  connect() {
    this.parse()
  }

  parse() {
    if (this.element.textContent.length > 0 && this.localizedValue !== true) {
      const format_str = this.element.dataset['format'] || 'yyyy-MM-dd HH:mm'
      const time = DateTime.fromISO(this.element.textContent)
      this.element.textContent = time.toFormat(format_str)
      this.localizedValue = true
    }
  }

}