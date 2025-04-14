import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['src', 'item', 'check', 'hidden']
  static values = {
    toggle: String
  }

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
      if (this.hasToggleValue) {
        this.checkTargets.forEach(el => {
          el.classList.remove(this.toggleValue)
        })
        this.hiddenTargets.forEach(el => {
          el.classList.add(this.toggleValue)
        })
      }
      document.querySelectorAll(`[name^="${ele.name.replace(/\[\w+]$/, '')}"]:not([name="${ele.name}"], [name="${ele.name.replace(/\[\w+]$/, '[id]')}"])`).forEach(ele => {
        ele.disabled = false
      })
    } else {
      if (this.hasToggleValue) {
        this.checkTargets.forEach(el => {
          el.classList.add(this.toggleValue)
        })
        this.hiddenTargets.forEach(el => {
          el.classList.remove(this.toggleValue)
        })
      }
      document.querySelectorAll(`[name^="${ele.name.replace(/\[\w+]$/, '')}"]:not([name="${ele.name}"], [name="${ele.name.replace(/\[\w+]$/, '[id]')}"])`).forEach(ele => {
        ele.disabled = true
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
