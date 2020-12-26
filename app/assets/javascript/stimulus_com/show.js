import { Controller } from 'stimulus'

class ShowController extends Controller {
  static targets = ['src', 'item']

  connect() {
    console.debug('Show Controller works!')
  }

  initEvent() {
    let ele = this.element
    ele.addEventListener('mouseenter', this.showItem)
    ele.addEventListener('mouseleave', this.hideItem)
  }

  show() {
    console.log(this)
    this.itemTargets.forEach(el => {
      el.style.visibility = 'visible'
    })
  }

  hide(event) {
    console.log(event.target)
    this.itemTargets.forEach(el => {
      el.style.visibility = 'hidden'
    })
  }

}

application.register('show', ShowController)
