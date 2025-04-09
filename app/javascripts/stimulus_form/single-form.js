import BaseController from '../base_controller'

// 底部表单
export default class extends BaseController {
  static targets = ['input']
  static values = {
    id: { type: String, default: 'bottom-field' },
    url: String
  }

  prepare() {
    const clonedItem = this.inputTarget.cloneNode(true)
    const target = document.getElementById(this.idValue)
    target.appendChild(clonedItem)
    clonedItem.focus()
  }
}
