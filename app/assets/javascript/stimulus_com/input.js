import { Controller } from 'stimulus'

// data-controller="input"
class InputController extends Controller {
  static targets = ['checkbox']

  connect() {
    console.debug(this.identifier, 'connected!')
  }

  // <label data-action="click->input#check"></label>
  // label out of check
  check() {
    if (this.hasCheckboxTarget) {
      this.checkboxTarget.checked = !this.checkboxTarget.checked
      this.submit(this.element)
    }
  }

  form(event) {
    this.submit(event.currentTarget.form)
  }

  filter(event) {
    let ele = event.currentTarget
    if (!ele.value) {
      return
    }
    this.submit(ele.form)
  }

  remove() {
    this.element.remove()
  }

  submit(form) {
    let evt = document.createEvent('Event')
    evt.initEvent('submit', true, true)
    form.dispatchEvent(evt)
  }

}

application.register('input', InputController)
