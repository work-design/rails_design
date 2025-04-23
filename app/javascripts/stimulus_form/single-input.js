import BaseController from '../base_controller'

// 底部表单
export default class extends BaseController {
  static targets = ['input']
  static outlets = ['single-form']
  static values = {
    id: { type: String, default: 'bottom-field' },
    url: String
  }

  connect() {
    this.initHeight = visualViewport.height
    console.debug('connect height:', this.initHeight)
  }

  disconnect() {
    this.singleFormOutletElement.classList.add('invisible')
  }

  prepare() {
    this.target.type = this.inputTarget.type
    this.target.name = this.inputTarget.name
    this.target.value = this.inputTarget.value

    this.target.focus({ preventScroll: true })
    this.singleFormOutletElement.classList.remove('invisible')
  }

  get target() {
    return this.singleFormOutlet.inputTarget
  }
}
