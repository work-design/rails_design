import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['dialog', 'mask']
  static values = {
    id: String,
    observable: Boolean,
    clear: Boolean
  }

  connect() {
    if (this.observableValue) {
      this.observer = new MutationObserver(this.loaded)
      this.observer.observe(this.dialogTarget, {childList: true})
    }
  }

  close() {
    if (this.hasMaskTarget) {
      this.maskTarget.classList.remove('weui-mask')
    }
    this.dialogTarget.classList.remove('weui-half-screen-dialog_show')
    this.element.classList.remove('weui-dialog__wrap_show')
    if (this.clearValue) {
      this.dialogTarget.replaceChildren()
    }
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
    list.forEach((item) => {
      const sheet = item.target.parentNode
      const con = sheet.getController('weui-dialog')
      switch(item.type) {
        case 'childList':
          if (item.addedNodes.length > 0) {
            con.show()
          }
      }
    })
  }

  get target() {
    const ele = document.getElementById(this.idValue)
    return ele.getController('weui-dialog')
  }

}
