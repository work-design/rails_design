import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['order']
  static values = {
    threshold: { type: Number, default: 0.35 },
    delay: { type: Number, default: 0.2 }
  }

  connect() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(el => {
          console.debug(el)
          if (el.isIntersecting) {
            Array.from(el.target.children).forEach((child, index) => {
              child.style.transitionDelay = `${index * this.delayValue}s`
              child.classList.add('has-fade-animate')
              child.classList.replace('has-fade-start', 'has-fade-end')
              child.addEventListener('transitionend', this.endXx, { once: true })
              child.addEventListener('transitioncancel', this.cancelXx, { once: true })
            })
          } else if (!el.isIntersecting && el.boundingClientRect.top > 0) {
            Array.from(el.target.children).forEach((child, index) => {
              child.style.transitionDelay = `${index * this.delayValue}s`
              child.classList.add('has-fade-animate')
              child.classList.replace('has-fade-end', 'has-fade-start')
              child.addEventListener('transitionend', this.endXx, { once: true })
              child.addEventListener('transitioncancel', this.cancelXx, { once: true })
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

  endXx(event) {
    const controller = event.target.closest('[data-controller~=enter-section]').controller('enter-section')
    controller.xx(event.target)
    event.target.removeEventListener('transitioncancel', controller.cancelXx)
  }

  cancelXx(event) {
    const controller = event.target.closest('[data-controller~=enter-section]').controller('enter-section')
    controller.xx(event.target)
    event.target.removeEventListener('transitionend', controller.endXx)
  }

  xx(target) {
    target.classList.remove('has-fade-animate')
    target.style.removeProperty('transition-delay')
  }

  disconnect() {
    this.observer.disconnect()
  }
}
