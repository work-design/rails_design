import { Controller } from '@hotwired/stimulus'

// data-controller="input"
export default class extends Controller {
  static targets = ['checkbox']
  static values = {
    url: String,
    method: String
  }

  // <label data-action="click->input#check"></label>
  // label out of check
  check() {
    if (this.hasCheckboxTarget) {
      this.checkboxTarget.checked = !this.checkboxTarget.checked
      this.submit(this.checkboxTarget.form)
    }
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
    this.doRequest(ele)
  }

  form(event) {
    const el = event.currentTarget

    if (el.value.length > 0) {
      this.submit(el.form)
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
