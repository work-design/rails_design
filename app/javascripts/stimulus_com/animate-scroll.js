import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['scroll']
  static values = {
    speed: { type: Number, default: 100 } // 默认速度 50px / s
  }

  connect() {
    const ele = this.element
    const scroll = this.scrollTarget
    const distance = scroll.scrollHeight - ele.clientHeight
    scroll.style.setProperty('--animate-scroll-from', `0`)
    scroll.style.setProperty('--animate-scroll-to', `-${distance}px`)
    scroll.style.setProperty('--animate-duration', `${distance / this.speedValue * 1000}ms`)

    scroll.addEventListener('mouseover', this.resetScroll, { once: true })

    scroll.addEventListener('mouseleave', e => {
      const distance = scroll.scrollHeight - ele.scrollTop
      scroll.style.setProperty('--animate-scroll-from', `-${ele.scrollTop}px`)
      scroll.style.setProperty('--animate-duration', `${distance / this.speedValue * 1000}ms`)
      scroll.style.setProperty('animation-iteration-count', 1)
      scroll.classList.add('has-animate-scrollUp')
      ele.scrollTo(0, 0)
      scroll.addEventListener('animationend', this.resetAnimate, { once: true })
      scroll.addEventListener('mouseover', this.resetScroll, { once: true })
      scroll.addEventListener('mouseover', e => { scroll.removeEventListener('animationend', this.resetAnimate) }, { once: true })
    })
  }

  resetAnimate(event) {
    const con = this.closest('[data-controller~=animate-scroll]').getController('animate-scroll')
    const scroll = event.currentTarget
    const ele = scroll.parentNode
    const distance = scroll.scrollHeight - ele.clientHeight
    console.debug('resetAnimate distance', distance)
    scroll.style.removeProperty('animation-iteration-count')
    scroll.style.setProperty('--animate-scroll-from', '0')
    scroll.style.setProperty('--animate-duration', `${distance / con.speedValue * 1000}ms`)
  }

  resetScroll(e) {
    const scroll = e.currentTarget
    const top = new DOMMatrix(getComputedStyle(scroll).transform)
    scroll.parentNode.scrollTo(0, -top.m42)
    scroll.style.removeProperty('transform')
    scroll.classList.remove('has-animate-scrollUp')
  }

}
