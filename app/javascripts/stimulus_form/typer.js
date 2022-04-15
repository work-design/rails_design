import { Controller } from '@hotwired/stimulus'

// data-controller="typer"
export default class extends Controller {
  static targets = ['input', 'value']

  connect() {
    this.initInput()
  }

  initInput() {
    const ele = this.inputTarget
    ele.addEventListener('input', this.form)
    ele.addEventListener('compositionstart', event => {
      event.target.removeEventListener('input', this.form)
    })
    ele.addEventListener('compositionend', event => {
      event.target.addEventListener('input', this.form)
      this.form(event)
    })
  }

  form(event) {
    const ele = event.currentTarget
    if (!ele.value) {
      return
    }

    this.submit(ele.form)
  }

  // click->typer#choose
  choose(event) {
    const ele = event.currentTarget
    this.valueTarget.value = ele.dataset['id']
    this.inputTarget.value = ele.dataset['name']
  }

}
