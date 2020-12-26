import { Controller } from 'stimulus'

class WeuiDialogController extends Controller {
  static targets = ['dialog']

  connect() {
    console.debug('Weui Half Screen Dialog Controller works!')
  }

  close() {
    let ele = this.element
    ele.style.display = 'none'
    ele.style.opacity = 0
    ele.style.transition = 'opacity 2s'
    this.dialogTarget.classList.remove('weui-half-screen-dialog_show')
  }

}

application.register('weui-dialog', WeuiDialogController)
