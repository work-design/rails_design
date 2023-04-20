import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['dialog']
  static values = {
    id: String
  }

  close() {
    const ele = this.element
    ele.style.display = 'none'
    ele.style.opacity = 0
    ele.style.transition = 'opacity 2s'
  }

  show() {
    const ele = this.target.element
    ele.style.display = 'block'
    ele.style.opacity = 0.95
    ele.style.transition = 'opacity 2s'
  }

  toggle() {
    const x = this.target
    if (x.dialogTarget.classList.contains('weui-half-screen-dialog_show')) {
      x.close()
    } else {
      x.show()
    }
  }

  get target() {
    const ele = document.getElementById(this.idValue)
    return ele.controller('mask')
  }

}
