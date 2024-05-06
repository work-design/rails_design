import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['menu', 'old', 'new']
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
          this.oldTargets.forEach(el => { el.classList.add('display-none') })
          this.newTargets.forEach(el => { el.classList.remove('display-none') })
        } else {
          this.element.classList.replace(this.newClass, this.oldClass)
          this.newTargets.forEach(el => { el.classList.add('display-none') })
          this.oldTargets.forEach(el => { el.classList.remove('display-none') })
        }
      })
    }
  }

  toggle(element) {
    element.currentTarget.classList.toggle('is-active')
    this.menuTarget.classList.toggle('is-active')
  }

}
