import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['src', 'item']

  connect() {
    console.debug('connected:', this.identifier)
  }

  initEvent() {
    let ele = this.element
    ele.addEventListener('mouseenter', this.showItem)
    ele.addEventListener('mouseleave', this.hideItem)
  }

  show() {
    //console.log(this)
    this.itemTargets.forEach(el => {
      el.style.visibility = 'visible'
    })
  }

  hide(event) {
    //console.log(event.target)
    this.itemTargets.forEach(el => {
      el.style.visibility = 'hidden'
    })
  }

}
