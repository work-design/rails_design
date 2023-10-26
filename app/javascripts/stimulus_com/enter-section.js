import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['order']
  static values = {
    threshold: { type: Number, default: 0.35 }
  }

  connect() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(el => {
          console.debug(el)
          if (el.isIntersecting) {
            Array.from(el.target.children).forEach((child, index) => {
              child.style.transitionDelay = `${index * 0.2}s`
              child.classList.replace('has-fade-init', 'has-fade-up')
            })
          } else {
            Array.from(el.target.children).forEach(child => {
              child.style.removeProperty('transition-delay')
              child.classList.replace('has-fade-up', 'has-fade-init')
            })
          }
        })
      },
      {
        threshold: this.thresholdValue
      }
    )
    this.observer.observe(this.element)
  }

  disconnect() {
    this.observer.disconnect()
  }
}
