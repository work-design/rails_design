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
          if (el.isIntersecting) {
            if (this.hasChildrenTarget) {
              Array.from(this.childrenTarget.children).forEach((child, index) => {
                child.style.transitionDelay = `${index * this.delayValue}s`
                this.zz(child)
                child.addEventListener('transitionend', this.endXx, {once: true})
                child.addEventListener('transitioncancel', this.cancelXx, {once: true})
              })
            } else {
              this.zz(el.target)
            }
          } else if (!el.isIntersecting && el.boundingClientRect.top > 0) {
            if (this.hasChildrenTarget) {
              Array.from(this.childrenTarget.children).forEach((child, index) => {
                child.style.transitionDelay = `${index * this.delayValue}s`
                this.zzz(child)
                child.addEventListener('transitionend', this.endXx, {once: true})
                child.addEventListener('transitioncancel', this.cancelXx, {once: true})
              })
            } else {
              this.zzz(el.target)
            }
          }
        })
      },
      {
        threshold: this.thresholdValue
      }
    )
    this.observer.observe(this.element)
  }

  zz(ele) {
    ele.classList.add('has-fade-animate')
    ele.classList.replace('has-fade-start', 'has-fade-end')
  }

  zzz(ele) {
    ele.classList.add('has-fade-animate')
    ele.classList.replace('has-fade-end', 'has-fade-start')
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
