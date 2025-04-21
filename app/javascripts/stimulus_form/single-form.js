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
    console.debug('connect height:', this.initHeight)
  }

  disconnect() {
    document.documentElement.style.removeProperty('height')
  }

  prepare() {
    const clonedItem = this.inputTarget.cloneNode(true)
    this.target.innerHTML = ''
    this.target.appendChild(clonedItem)

    const form = this.target.parentNode

    visualViewport.addEventListener('resize', () => {
      console.debug('-------------resize', visualViewport.height, this.initHeight)
      if (visualViewport.height < this.initHeight) {
        form.style.top = `${visualViewport.height - form.clientHeight}px`
        form.classList.remove('invisible')
        clonedItem.focus({ preventScroll: true })
      } else if (visualViewport.height === this.initHeight) {
        form.classList.add('invisible')
      }
    })
  }

  get target() {
    return document.getElementById(this.idValue)
  }
}
