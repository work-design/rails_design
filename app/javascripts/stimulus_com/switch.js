import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['src', 'item']

  show() {
    this.itemTargets.forEach(el => {
      el.style.visibility = 'visible'
    })
  }

  hide() {
    this.itemTargets.forEach(el => {
      el.style.visibility = 'hidden'
    })
  }

}
