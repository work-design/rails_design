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

  prepareArea() {
    this.target.name = this.inputTarget.name
    this.target.value = this.inputTarget.value

    if (visualViewport.height < innerHeight) {
      this.singleFormOutletElement.classList.remove('invisible')
      this.target.focus({ preventScroll: true })
    } else {
      visualViewport.addEventListener('resize', () => {
        console.debug('resize', visualViewport.height, innerHeight)
        if (visualViewport.height < innerHeight) {
          this.singleFormOutletElement.style.top = `${visualViewport.height - this.singleFormOutletElement.clientHeight}px`
          this.singleFormOutletElement.classList.remove('invisible')
          this.target.focus({ preventScroll: true })

          visualViewport.addEventListener('resize', () => {
            this.singleFormOutletElement.classList.add('invisible')
          }, { once: true })
        } else if (visualViewport.height === innerHeight) {
          this.singleFormOutletElement.classList.add('invisible')
        }
      }, { once: true })
    }
  }

  prepare() {
    this.target.type = this.inputTarget.type
    this.prepareArea()
  }

  get target() {
    return this.singleFormOutlet.inputTarget
  }
}
