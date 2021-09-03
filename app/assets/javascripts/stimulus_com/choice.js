import { Controller } from 'stimulus'
import Choices from 'choices.js'

export default class extends Controller {

  reload(element) {
    new Choices(element, {
      noChoicesText: '无可选项',
      itemSelectText: '点击选择',
      removeItemButton: true
    })
  }

  connect() {
    this.reload(this.element)
  }

}
