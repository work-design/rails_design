import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['src', 'item']

  connect() {
    const ele = this.element
    ele.classList.remove('is-invisible')
    ele.style.animationDuration = `${ele.innerText.length * 200}ms`
    ele.classList.add('has-animate-typer')
    ele.addEventListener('animationend', this.xx, { once: true })
  }

  xx(event) {
    const ele = event.currentTarget
    const nextEle = ele.nextElementSibling
    if (nextEle) {
      nextEle.dataset.add('controller', 'animate-typer')
    }
  }

}
