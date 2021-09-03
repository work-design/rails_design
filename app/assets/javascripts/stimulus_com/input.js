import { Controller } from 'stimulus'

// data-controller="input"
export default class extends Controller {
  static targets = ['checkbox']

  // <label data-action="click->input#check"></label>
  // label out of check
  check() {
    if (this.hasCheckboxTarget) {
      this.checkboxTarget.checked = !this.checkboxTarget.checked
      this.submit(this.checkboxTarget.form)
    }
  }

  form(event) {
    const el = event.currentTarget

    if (el.value.length > 0) {
      this.submit(event.currentTarget.form)
    }
  }

  filter(event) {
    const ele = event.currentTarget
    if (!ele.value) {
      return
    }
    this.submit(ele.form)
  }

  remove() {
    this.element.remove()
  }

}
