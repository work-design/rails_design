import { Controller } from '@hotwired/stimulus'
import moment from 'moment'

// data-controller="time"
export default class extends Controller {

  connect() {
    this.parse()
  }

  parse() {
    if (this.element.textContent.length > 0) {
      let format = this.element.dataset['format'] || 'YYYY-MM-DD HH:mm'
      this.element.textContent = moment.utc(this.element.textContent).local().format(format)
      this.element.dataset['localized'] = 'true'
    }
  }

}
