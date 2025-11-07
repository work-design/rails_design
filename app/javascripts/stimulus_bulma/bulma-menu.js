import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  enter(event) {
    const ele = event.currentTarget
    this.element.querySelectorAll('.menu-item').forEach(el => {
      if (el.tagName !== 'A') {
        el = el.firstElementChild
      }
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active')
      }
    })
    ele.classList.add('is-active')
  }

}
