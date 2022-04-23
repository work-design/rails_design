import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['source', 'toast']

  copyInput() {
    navigator.clipboard.writeText(this.sourceTarget.value)
  }

  copy() {
    navigator.clipboard?.writeText(this.sourceTarget.textContent)
    if (this.hasToastTarget) {
      this.toastTarget.classList.add('weui-toast__wrap_show')
      this.toastTarget.addEventListener('animationend', (event) => {
        event.currentTarget.classList.remove('weui-toast__wrap_show')
      }, { once: true })
    }
  }
}

