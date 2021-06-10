import { Controller } from 'stimulus'

class WeuiDialogController extends Controller {
  static targets = ['dialog']

  connect() {
    console.debug('connected:', this.identifier)
  }

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

application.register('weui-dialog', WeuiDialogController)
