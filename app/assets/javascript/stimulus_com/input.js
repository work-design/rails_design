import { Controller } from 'stimulus'

// data-controller="input"
class InputController extends Controller {
  static targets = ['checkbox']

  connect() {
    console.debug('Input Controller works!')
  }

  // <label data-action="click->input#check"></label>
  // label out of check
  check() {
    if (this.hasCheckboxTarget) {
      this.checkboxTarget.checked = !this.checkboxTarget.checked

      let evt = document.createEvent('Event')
      evt.initEvent('submit', true, true)
      this.element.dispatchEvent(evt)
    }
  }

  // change->input#check
  uncheck(event) {

  }

  form(event) {
    let el = event.currentTarget

    let evt = document.createEvent('Event')
    evt.initEvent('submit', true, true)
    el.form.dispatchEvent(evt)
  }

  filter(event) {
    let ele = event.currentTarget
    if (!ele.value) {
      return
    }

    let evt = document.createEvent('Event')
    evt.initEvent('submit', true, true)
    ele.form.dispatchEvent(evt)
  }

  remove() {
    this.element.remove()
  }

}

application.register('input', InputController)
