import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['input', 'cancel']

  connect() {
    if (this.hasInputTarget && this.inputTarget.value.length > 0) {
      this.focus()
    }
  }

  focus() {
    this.cancelTarget.classList.remove('display-none')
    this.inputTarget.focus()
  }

  clear() {
    this.inputTarget.value = ''
    this.inputTarget.focus()
  }

  cancel(e) {
    const el = e.currentTarget
    el.classList.add('display-none')
    this.inputTarget.blur()

    Turbo.visit(location.href, { action: 'replace' })
  }

}
