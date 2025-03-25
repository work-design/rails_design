import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['scroll']

  connect() {
    const ele = this.element
    const scroll = this.scrollTarget
    scroll.style.setProperty('--animate-scroll-to', `translateY(-${scroll.scrollHeight - ele.clientHeight}px)`)

    //ele.classList.remove('invisible')
    //ele.style.animationDuration = `${ele.innerText.length * 200}ms`
    //ele.classList.add('has-animate-typer')
    scroll.addEventListener('animationend', this.scrollBack, { once: true })
  }

  scrollBack(e) {
    const el = e.currentTarget
    el.classList.replace('has-animate-scrollUp', 'has-animate-scrollDown')
    //el.style.setProperty('--animate-scroll-to', `translateY(0)`)

  }

}
