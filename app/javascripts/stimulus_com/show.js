import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['src', 'item']

  show() {
    this.itemTargets.forEach(el => {
      el.style.visibility = 'visible'
    })
  }

  hide() {
    this.itemTargets.forEach(el => {
      el.style.visibility = 'hidden'
    })
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
