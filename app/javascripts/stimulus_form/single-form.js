import BaseController from '../base_controller'

// 底部表单
export default class extends BaseController {
  static targets = ['input']
  static values = {
    id: { type: String, default: 'bottom-field' },
    url: String
  }

  connect() {

  }

  disconnect() {
    document.documentElement.style.removeProperty('height')
  }

  prepare() {
    const clonedItem = this.inputTarget.cloneNode(true)
    this.target.appendChild(clonedItem)
    this.target.parentNode.classList.remove('display-none')
    window.visualViewport.addEventListener('resize', () => {
      console.debug('-------------, resize', window.visualViewport.height, document.body.clientHeight)
      if (window.visualViewport.height < 400) {
        this.target.parentNode.style.top = `${window.visualViewport.height - this.target.parentNode.clientHeight}px`
      }
    })
    clonedItem.focus()
  }

  get target() {
    return document.getElementById(this.idValue)
  }
}
