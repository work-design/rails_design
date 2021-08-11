import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['mask', 'sheet']
  static values = {
    id: String
  }

  connect() {
    console.debug('connected:', this.identifier)
  }

  close() {
    let ele = this.maskTarget
    ele.style.display = 'none'
    ele.style.opacity = 0
    ele.style.transition = 'opacity 2s'
    this.sheetTarget.classList.remove('weui-actionsheet_toggle')
  }

  show() {
    let ele = this.maskTarget
    ele.style.display = 'block'
    ele.style.opacity = 1
    ele.style.transition = 'opacity 2s'
    this.sheetTarget.classList.add('weui-actionsheet_toggle')
  }

  toggle() {
    let x = this.target
    if (x.sheetTarget.classList.contains('weui-actionsheet_toggle')) {
      x.close()
    } else {
      x.show()
    }
  }

  get target() {
    let ele = document.getElementById(this.idValue)
    return application.getControllerForElementAndIdentifier(ele, 'weui-actionsheet')
  }

}
