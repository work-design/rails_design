import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['dialog']
  static values = {
    id: String
  }

  close() {
    const ele = this.element
    ele.classList.add('display-none')
  }

  show(event) {
    event.preventDefault()
    const ele = this.target.element
    ele.classList.remove('display-none')
  }

  toggle() {
    const x = this.target
    if (x.dialogTarget.classList.contains('display-none')) {
      x.show()
    } else {
      x.close()
    }
  }

  get target() {
    const ele = document.getElementById(this.idValue)
    return ele.getController('mask')
  }

}