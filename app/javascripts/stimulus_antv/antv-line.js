import { Controller } from '@hotwired/stimulus'
import { Line } from '@antv/g2plot'

export default class extends Controller {
  static values = {
    url: String
  }

  connect() {
    this.line = new Line(this.element, {
      xField: 'year',
      yField: 'value',
      yAxis: {
        label: {
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
        }
      }
    })
    this.xx(this.line)
  }

  xx(line) {
    fetch(this.urlValue).then(res => res.json()).then(data => {
      line.update({data: data})
    })
  }

  disconnect() {
    this.line.destroy()
  }

}
