import { Controller } from '@hotwired/stimulus'
import { parseJSON, format } from 'date-fns'

// data-controller="time"
export default class extends Controller {

  connect() {
    this.parse()
  }

  parse() {
    if (this.element.textContent.length > 0) {
      const format_str = this.element.dataset['format'] || 'yyyy-MM-dd HH:mm'
      const time = parseJSON(this.element.textContent)
      this.element.textContent = format(time, format_str)
      this.element.dataset['localized'] = 'true'
    }
  }

}
