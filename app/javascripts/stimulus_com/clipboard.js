import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['source', 'toast']

  copyInput() {
    navigator.clipboard.writeText(this.sourceTarget.value)
  }

  copyInner() {
    navigator.clipboard.writeText(this.sourceTarget.innerText)
  }

  copy() {
    navigator.clipboard?.writeText(this.sourceTarget.textContent)
    if (this.hasToastTarget) {
      this.toastTarget.style.animationDuration = '2s'
      this.toastTarget.classList.remove('display-none')
      this.toastTarget.classList.add('has-animate-fade-in-out')
      this.toastTarget.addEventListener('animationend', (event) => {
        event.currentTarget.classList.add('display-none')
        event.currentTarget.classList.remove('has-animate-fade-in-out')
      }, { once: true })
    }
  }
}

