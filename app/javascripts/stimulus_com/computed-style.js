import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['aim']

  aimTargetConnected(target) {
    const x = this.element.getBoundingClientRect()
    target.style.left = `${x.width}px`
  }
}