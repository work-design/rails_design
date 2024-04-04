import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['src', 'item', 'check', 'hidden']

  show() {
    this.itemTargets.forEach(el => {
      el.classList.remove('visibility-hidden')
    })
  }

  hide() {
    this.itemTargets.forEach(el => {
      el.classList.add('visibility-hidden')
    })
  }

  toggle(event) {
    const ele = event.currentTarget
    if (ele.checked) {
      this.checkTargets.forEach(el => {
        el.classList.remove('visibility-hidden')
      })
      this.hiddenTargets.forEach(el => {
        el.classList.add('visibility-hidden')
      })
    } else {
      this.checkTargets.forEach(el => {
        el.classList.add('visibility-hidden')
      })
      this.hiddenTargets.forEach(el => {
        el.classList.remove('visibility-hidden')
      })
    }
  }

  queryShow(event) {
    const ele = event.currentTarget
    if (ele.dataset.hidden) {
      const hiddenEles = document.querySelectorAll(ele.dataset.hidden)
      hiddenEles.forEach(el => {
        el.style.display = 'none'
      })
    }

    if (ele.dataset.next) {
      const nextEles = document.querySelectorAll(ele.dataset.next)
      nextEles.forEach(el => {
        el.style.removeProperty('display')
      })
    }
  }

}
