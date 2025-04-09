import BaseController from '../base_controller'

// 底部表单
export default class extends BaseController {
  static targets = ['input']
  static values = {
    id: { type: String, default: 'bottom-field' },
    url: String
  }

  connect() {
    window.visualViewport.addEventListener('resize', () => {
      alert(window.visualViewport.height)
    })
  }

  prepare() {
    const clonedItem = this.inputTarget.cloneNode(true)
    this.target.appendChild(clonedItem)
    clonedItem.focus()
  }

  get target() {
    return document.getElementById(this.idValue)
  }
}
