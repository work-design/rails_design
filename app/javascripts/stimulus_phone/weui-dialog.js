import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['dialog', 'mask']
  static values = {
    id: String
  }

  close() {
    this.dialogTarget.classList.remove('weui-half-screen-dialog_show')
    this.maskTarget.classList.remove('weui-mask')
    this.dialogTarget.replaceChildren()
  }

  show() {
    this.maskTarget.classList.add('weui-mask')
    this.dialogTarget.classList.add('weui-half-screen-dialog_show')
  }

  toggle() {
    const x = this.target
    if (x.dialogTarget.classList.contains('weui-half-screen-dialog_show')) {
      x.close()
    } else {
      x.show()
    }
  }

  loaded(event) {
    this.show()
  }

  get target() {
    const ele = document.getElementById(this.idValue)
    return ele.controller('weui-dialog')
  }

}
