import BaseController from '../base_controller'

export default class extends BaseController {
  static values = {
    id: String,
    input: String
  }
  static outlets = ['modal']

  confirmValue() {
    const input = document.getElementById(this.idValue)
    input.value = this.inputValue
    this.modalOutletElement.remove()
  }

  clear(node) {
    let el = node.nextElementSibling
    while (el) {
      el.remove()
      el = node.nextElementSibling
    }
  }

}
