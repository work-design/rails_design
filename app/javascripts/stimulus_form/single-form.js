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
      document.documentElement.style.height = `${window.visualViewport.height}px`
    })
  }

  disconnect() {
    document.documentElement.style.removeProperty('height')
  }

  prepare() {
    const clonedItem = this.inputTarget.cloneNode(true)
    this.target.appendChild(clonedItem)
    this.target.parentNode.classList.remove('display-none')
    clonedItem.focus()
  }

  get target() {
    return document.getElementById(this.idValue)
  }
}
