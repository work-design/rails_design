import BaseController from '../base_controller'

// 底部表单
export default class extends BaseController {
  static targets = ['input']
  static values = {
    id: { type: String, default: 'bottom-field' },
    url: String
  }

  connect() {
    this.initHeight = visualViewport.height
  }

  disconnect() {
    document.documentElement.style.removeProperty('height')
  }

  prepare() {
    const clonedItem = this.inputTarget.cloneNode(true)
    this.target.innerHTML = ''
    this.target.appendChild(clonedItem)
    this.target.parentNode.classList.remove('display-none')
    visualViewport.addEventListener('resize', () => {
      console.debug('-------------resize', visualViewport.height, this.initHeight)
      if (visualViewport.height < this.initHeight) {
        this.target.parentNode.style.top = `${visualViewport.height - this.target.parentNode.clientHeight}px`
        document.body.scrollTo(0, 0)
      }
    })
    clonedItem.focus()
  }

  get target() {
    return document.getElementById(this.idValue)
  }
}
