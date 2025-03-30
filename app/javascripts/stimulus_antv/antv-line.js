import { AntvBaseController } from './antv-base'

export default class extends AntvBaseController {

  connect() {
    super.connect()
    this.chart.encode({
      x: 'year',
      y: 'value'
    })
    this.chart.axis('y', { labelFormatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) })
    this.chart.line().encode('shape', 'smooth')
    this.chart.point().encode('shape', 'point').tooltip(false)
    this.chart.render()
  }

}
