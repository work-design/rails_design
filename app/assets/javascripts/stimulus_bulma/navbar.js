import { Controller } from '@hotwired/stimulus'

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
    let scrollEle, scrollEvent
    if (this.element.parentNode === document.body) {
      scrollEle = document.documentElement
      scrollEvent = document
    } else {
      scrollEle = this.element.parentNode
      scrollEvent = scrollEle
    }
    if (this.scrollValue) {
      scrollEvent.addEventListener('scroll', () => {
        if (scrollEle.scrollTop > 0) {
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
