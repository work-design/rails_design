import { Controller } from '@hotwired/stimulus'
import { Chart } from '@antv/g2'

export default class extends Controller {
  static values = {
    url: String
  }

  connect() {
    this.chart = new Chart({
      container: this.element,
      autoFit: true
    })
    if (this.hasUrlValue) {
      const url = new URL(this.urlValue, location.origin)
      url.pathname = `${url.pathname}.json`
      this.chart.options({
        data: {
          type: 'fetch',
          value: url,
          format: 'json'
        }
      })
    }
  }

  disconnect() {
    this.chart.destroy()
  }
}