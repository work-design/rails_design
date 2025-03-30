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
    this.chart.options({
      data: {
        type: 'fetch',
        value: `${this.urlValue}.json`,
        format: 'json'
      }
    })
  }

  disconnect() {
    this.chart.destroy()
  }
}