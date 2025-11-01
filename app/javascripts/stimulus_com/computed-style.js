import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['aim']

  aimTargetConnected(target) {
    const ro = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0]
      target.style.left = `${box.inlineSize}px`

      ro.unobserve(entry.target)
    })
    ro.observe(this.element)
  }
}