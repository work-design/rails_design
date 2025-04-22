import BaseController from '../base_controller'

// 底部表单
export default class extends BaseController {
  targets = ['input']

  connect() {
    visualViewport.addEventListener('resize', () => {
      console.debug('-------------resize', visualViewport.height, innerHeight)
      if (visualViewport.height < innerHeight) {
        this.element.style.top = `${visualViewport.height - this.element.clientHeight}px`
      } else if (visualViewport.height === innerHeight) {
        this.element.classList.add('invisible')
      }
    })
  }

}
