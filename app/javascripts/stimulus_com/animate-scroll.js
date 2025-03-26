import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['scroll']

  connect() {
    const ele = this.element
    const scroll = this.scrollTarget
    scroll.style.setProperty('--animate-scroll-to', `translateY(-${scroll.scrollHeight - ele.clientHeight}px)`)
  }

}
