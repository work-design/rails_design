import { AntvBaseController } from './antv-base'

export default class extends AntvBaseController {

  connect() {
    super.connect()
    this.chart.encode({
      x: 'year',
      y: 'value'
    })
    this.chart.coordinate({ transform: [{ type: 'transpose' }] })
    this.chart.render()
  }

}
