import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['order', 'children']
  static values = {
    threshold: { type: Number, default: 0.35 },
    delay: { type: Number, default: 0.2 }
  }

  connect() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(el => {
          console.debug('--------', el.intersectionRatio)
          el.target.classList.toggle('is-active', el.intersectionRatio < 1)
        })
      },
      {
        threshold: 1,
        root: this.element.parentNode
      }
    )
    this.observer.observe(this.element)
  }

  disconnect() {
    this.observer.disconnect()
  }
}
