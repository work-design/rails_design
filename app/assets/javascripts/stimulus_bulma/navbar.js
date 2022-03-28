import { Controller } from '@hotwired/stimulus'
import { application } from '../rails_design/stimulus'

export default class extends Controller {
  static targets = ['menu']
  static classes = ['old', 'new']
  static values = {
    scroll: Boolean
  }

  connect() {
    this.scrollLook()
  }

  scrollLook() {
    if (this.scrollValue) {
      document.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 0) {
          this.element.classList.replace(this.oldClass, this.newClass)
        } else {
          this.element.classList.replace(this.newClass, this.oldClass)
        }
      })
    }
  }

  toggle(element) {
    element.currentTarget.classList.toggle('is-active')
    this.menuTarget.classList.toggle('is-active')
  }

}
