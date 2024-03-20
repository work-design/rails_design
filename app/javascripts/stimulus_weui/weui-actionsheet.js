import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['mask', 'sheet']
  static values = {
    id: String
  }

  close() {
    const ele = this.maskTarget
    ele.style.display = 'none'
    ele.style.opacity = 0
    ele.style.transition = 'opacity 2s'
    this.sheetTarget.classList.remove('weui-actionsheet_toggle')
  }

  remove() {
    this.element.remove()
  }

  show() {
    const ele = this.maskTarget
    ele.style.display = 'block'
    ele.style.opacity = 1
    ele.style.transition = 'opacity 2s'
    this.sheetTarget.classList.add('weui-actionsheet_toggle')
  }

  toggle() {
    const x = this.target
    if (x.sheetTarget.classList.contains('weui-actionsheet_toggle')) {
      x.close()
    } else {
      x.show()
    }
  }

  // NOTICE: here this becomes observer
  loaded(list, observer) {
    list.forEach((item) => {
      const con = item.target.closest('[data-controller~=weui-actionsheet]').getController('weui-actionsheet')
      switch(item.type) {
        case 'childList':
          if (item.addedNodes.length > 0) {
            con.show()
          }
      }
    })
  }

  get menu() {
    return document.getElementById('actionsheet_menu')
  }

  get target() {
    const ele = document.getElementById(this.idValue)
    return ele.getController('weui-actionsheet')
  }

}
