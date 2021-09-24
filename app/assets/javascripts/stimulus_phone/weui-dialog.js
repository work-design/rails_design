import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['dialog']

  close() {
    let ele = this.element
    ele.style.display = 'none'
    ele.style.opacity = 0
    ele.style.transition = 'opacity 2s'
    this.dialogTarget.classList.remove('weui-half-screen-dialog_show')
  }

  show() {
    let ele = this.element
    ele.style.display = 'block'
    ele.style.opacity = 1
  }

}
