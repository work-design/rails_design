import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['src']

  toggle(event) {
    this.srcTargets.forEach(el => {
      el.classList.toggle('is-hidden')
    })
  }

}
