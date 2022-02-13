import ConfigController from './config'

export default class extends ConfigController {

  connect() {
    super.connect()

    WWOpenData.bind(this.element)
  }

}
