import AntvBaseController from './antv-base'

export default class extends AntvBaseController {

  connect() {
    super.connect()
    this.chart.encode({
      x: 'date',
      y: 'value',
      color: 'symbol'
    })
    this.chart.axis({
      x: { title: false },
      y: { title: false }
    })
    this.chart.line().encode('shape', 'line')
    this.chart.point().encode('shape', 'point').tooltip(false)
    this.chart.render()
  }

}
