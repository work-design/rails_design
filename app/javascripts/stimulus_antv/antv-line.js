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
        value: this.urlValue,
        format: 'json'
      },
      encode: {
        x: 'year',
        y: 'value'
      }
    })
    this.chart.axis('y', { labelFormatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) });
    this.chart.line().encode('shape', 'smooth');
    this.chart.point().encode('shape', 'point').tooltip(false);
    this.chart.render()
  }

  disconnect() {
    this.chart.destroy()
  }

}
