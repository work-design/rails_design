import { Controller } from '@hotwired/stimulus'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

export default class extends Controller {
  static values = {
    url: String
  }

  connect() {
    this.calendar = new Calendar(this.element, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      fixedWeekCount: false,
      eventSources: [
        {
          url: '/events'
        }
      ]
    })
    this.calendar.render()
  }

  disconnect() {
    this.calendar.destroy()
  }

}
