import { Controller } from 'stimulus'

// data-controller="typer"
export default class extends Controller {
  static targets = ['input', 'value']

  connect() {
    console.debug('connected:', this.identifier)
    this.initInput()
  }

  initInput() {
    let ele = this.inputTarget
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
    let ele = event.currentTarget
    if (!ele.value) {
      return
    }

    let evt = document.createEvent('Event')
    evt.initEvent('submit', true, true)
    ele.form.dispatchEvent(evt)
  }

  // click->typer#choose
  choose(event) {
    let ele = event.currentTarget
    this.valueTarget.value = ele.dataset['id']
    this.inputTarget.value = ele.dataset['name']
  }

}
