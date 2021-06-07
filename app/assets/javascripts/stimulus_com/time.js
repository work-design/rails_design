import { Controller } from 'stimulus'
import moment from 'moment'

// data-controller="time"
class TimeController extends Controller {

  connect() {
    console.debug('connected:', this.identifier)
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

application.register('time', TimeController)
