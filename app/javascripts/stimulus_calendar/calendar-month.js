import { Controller } from '@hotwired/stimulus'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'

export default class extends Controller {
  static values = {
    url: { type: String, default: '/events' }
  }

  connect() {
    this.calendar = new Calendar(this.element, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      fixedWeekCount: false,
      eventSources: [
        {
          url: this.urlValue
        }
      ],
      eventDidMount: (info) => {
        console.debug(',,,', info)
        let url = info.event.extendedProps.img
        if (url) {
          info.el.style.backgroundImage = `url(${url})`
        }
      }
    })
    this.calendar.render()
  }

  disconnect() {
    this.calendar.destroy()
  }

}
