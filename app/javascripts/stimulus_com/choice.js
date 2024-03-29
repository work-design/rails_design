import { Controller } from '@hotwired/stimulus'
import Choices from 'choices.js'

export default class extends Controller {

  connect() {
    this.reload(this.element)
  }

  reload(element) {
    new Choices(element, {
      noChoicesText: '无可选项',
      itemSelectText: '点击选择',
      removeItemButton: true
    })
  }

}
