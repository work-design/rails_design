import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    threshold: { type: Number, default: 0.35 }
  }

  connect() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(el => {
          console.debug(el)
          if (el.isIntersecting) {
            el.target.classList.add('has-animate-fadeInUp')
            this.element.style.opacity = 1
          } else {
            this.element.style.opacity = 0
          }
        })
      },
      {
        threshold: this.thresholdValue
      }
    )
    this.element.style.opacity = 0
    this.observer.observe(this.element)
  }

  disconnect() {
    this.observer.disconnect()
  }
}
