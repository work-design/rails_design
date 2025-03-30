import AntvBaseController from './antv-base'

export default class extends AntvBaseController {

  connect() {
    super.connect()
    this.chart.encode({
      x: 'name',
      y: 'value'
    })
    this.chart.type = 'interval'
    this.chart.coordinate({ transform: [{ type: 'transpose' }] })
    this.chart.render()
  }

}
