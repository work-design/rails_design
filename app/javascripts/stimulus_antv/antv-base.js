import { Controller } from '@hotwired/stimulus'
import { Chart } from '@antv/g2'

export default class extends Controller {
  static values = {
    url: String,
    options: { type: Object, default: {} }
  }

  connect() {
    this.chart = new Chart({
      container: this.element,
      autoFit: true,
      ...this.optionsValue
    })
    if (this.hasUrlValue) {
      const url = new URL(this.urlValue, location.origin)
      url.pathname = `${url.pathname}.json`
      this.chart.options({
        title: false,
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