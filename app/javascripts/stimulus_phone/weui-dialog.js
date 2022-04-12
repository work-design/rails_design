import { Controller } from '@hotwired/stimulus'
import { application } from '../rails_design/stimulus'

export default class extends Controller {
  static targets = ['dialog', 'mask']
  static values = {
    id: String
  }

  connect() {
    this.observer = new MutationObserver(this.loaded)
    this.observer.observe(this.dialogTarget, { childList: true })
  }

  close() {
    this.dialogTarget.classList.remove('weui-half-screen-dialog_show')
    this.maskTarget.classList.remove('weui-mask')
    //this.dialogTarget.replaceChildren()
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

  // NOTICE: here this becomes observer
  loaded(list, observer) {
    const item = list[0]
    const sheet = item.target.parentNode
    const con = sheet.controller('weui-dialog')
    switch(item.type) {
      case 'childList':
        con.show()
    }
  }

  get target() {
    const ele = document.getElementById(this.idValue)
    return ele.controller('weui-dialog')
  }

}
