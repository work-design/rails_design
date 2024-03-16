import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['src', 'item']

  connect() {
    const ele = this.element
    ele.classList.remove('invisible')
    ele.style.animationDuration = `${ele.innerText.length * 200}ms`
    ele.classList.add('has-animate-typer')
    ele.addEventListener('animationend', this.typeNext, { once: true })
  }

  typeNext(event) {
    const ele = event.currentTarget
    let nextEle = ele.nextElementSibling
    while (nextEle) {
      if (nextEle.innerHTML) {
        nextEle.dataset.add('controller', 'animate-typer')
        break
      } else {
        nextEle = nextEle.nextElementSibling
      }
    }
  }

}
