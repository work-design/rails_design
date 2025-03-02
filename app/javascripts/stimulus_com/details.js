import BaseController from '../base_controller'

export default class extends BaseController {

  connect() {
    if (this.element.open) {
      this.open()
    }
    this.element.addEventListener('toggle', event => {
      if (event.currentTarget.open) {
        this.open()
      }
    })
  }

  open() {
    if (this.hasUrlValue) {
      this.get(this.urlValue)
    }
    Array.from(this.element.parentNode.children).filter(child => {
      if (child !== this.element && child.matches('details.details')) {
        child.open = false
      }
    })
  }

}
