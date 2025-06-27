import AntvBaseController from './antv-base'

export default class extends AntvBaseController {

  connect() {
    super.connect()
    this.chart.encode({
      x: 'date',
      y: 'value',
      color: 'symbol'
    })
    this.chart.line().encode('shape', 'smooth')
    this.chart.point().encode('shape', 'point').tooltip(false)
    this.chart.render()
  }

}
