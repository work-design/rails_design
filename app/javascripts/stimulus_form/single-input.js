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

  inputTargetConnected(ele) {
    if (ele.tagName === 'TEXTAREA') {
      ele.style.height = 'auto'
      ele.style.height = `${ele.scrollHeight}px`
    }
  }

  prepareArea(e) {
    this.target.name = this.inputTarget.name
    this.target.value = this.inputTarget.value
    console.debug(document.activeElement)

    const handleResize = () => {
      if (visualViewport.height < innerHeight) {
        this.singleFormOutletElement.style.top = `${visualViewport.height - this.singleFormOutletElement.clientHeight}px`
        this.singleFormOutletElement.classList.remove('invisible')
        this.target.focus({ preventScroll: true })
      } else {
        this.singleFormOutletElement.classList.add('invisible')
        visualViewport.removeEventListener('resize', handleResize)
      }

      console.debug('Resize detected:', visualViewport.height, innerHeight)
    }

    visualViewport.addEventListener('resize', handleResize)
  }



  prepare(e) {
    this.target.type = this.inputTarget.type
    this.prepareArea(e)
  }

  get target() {
    return this.singleFormOutlet.inputTarget
  }
}
