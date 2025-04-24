import BaseController from '../base_controller'

// 底部表单
export default class extends BaseController {
  static targets = ['input']

  connect() {
    this.inputTarget.addEventListener('blur', () => {
      //this.element.classList.add('invisible')
    })
  }



}
