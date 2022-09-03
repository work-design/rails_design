import { Controller } from '@hotwired/stimulus'
import { Line } from '@antv/g2plot'

export default class extends Controller {
  static values = {
    url: String
  }

  connect() {
    this.line = new Line(this.element, {
      data: this.defaultData(),
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      xAxis: {
        type: 'time',
      },
      yAxis: {
        label: {
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
        },
      }
    })
    this.line.render()
    //this.xx(this.line)
  }

  defaultData() {
    return [{
      year: '2022',
      value: 1,
      category: 'xxx'
    }, {
      year: '2023',
      value: 2,
      category: 'xxx'
    }]
  }

  xx(line) {
    fetch(this.urlValue)
      .then(res => res.json())
      .then(data => {
        line.update({
          data,
          xField: 'year',
          yField: 'value',
          seriesField: 'category',
          xAxis: {
            type: 'time',
          },
          yAxis: {
            label: {
              formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
            },
          },
        })
      })
  }

  disconnect() {
    this.line.destroy()
  }

}
