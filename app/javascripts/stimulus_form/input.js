import BaseController from '../base_controller'

// data-controller="input"
export default class extends BaseController {
  static targets = ['checkbox']
  static values = {
    force: Boolean
  }

  // <label data-action="click->input#check"></label>
  // label out of check
  check() {
    if (this.hasCheckboxTarget) {
      this.checkboxTarget.checked = !this.checkboxTarget.checked
      this.checkboxTarget.form.requestSubmit()
    }
  }

  submit(el) {
    el.currentTarget.form.requestSubmit()
  }

  // label wrap input
  toggle() {
    if (this.hasCheckboxTarget) {
      const form = new FormData(this.checkboxTarget.form)
      form.append('checked', this.checkboxTarget.checked)

      this.request(this.checkboxTarget.form.action, this.checkboxTarget.form.method, form)
    }
  }

  link(event) {
    const ele = event.currentTarget
    this.inputGet(ele)
  }

  form(event) {
    const el = event.currentTarget

    if (el.value.length > 0 || this.forceValue) {
      el.form.requestSubmit()
    }
  }

  filter(event) {
    const ele = event.currentTarget
    if (!ele.value) {
      return
    }
    ele.form.requestSubmit()
  }

  remove() {
    this.element.remove()
  }

  // focus->form#blank
  blank(event) {
    const ele = event.currentTarget
    ele.lastValue = ele.value
    ele.value = ''

    ele.addEventListener('blur', this.restoreLastValue, { once: true })
  }

  restoreLastValue(event) {
    const ele = event.currentTarget
    if (isNaN(ele.valueAsNumber)) {
      ele.value = ele.lastValue
    }
  }

}
