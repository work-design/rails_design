import { Controller } from '@hotwired/stimulus'

// data-controller="check"
export default class extends Controller {
  static targets = ['ids']
  static values = {
    name: String
  }

  connect() {
    for (const ingredient of this.checkboxes) {
      ingredient.addEventListener('click', this.updateDisplay)
    }
  }

  // checkbox data-action="check#toggleAll"
  toggleAll(event) {
    const element = event.currentTarget

    for (const checkbox of this.checkboxes) {
      if (!checkbox.disabled) {
        checkbox.checked = element.checked
      }
    }
  }

  doSubmit(event) {
    event.preventDefault()

    const ids = []
    this.checkboxes.forEach(item => {
      if (item.checked && !item.disabled) {
        ids.push(item.value)
      }
    })

    if (ids.length > 0) {
      this.idsTarget.value = ids
      this.idsTarget.form.requestSubmit()
    } else {
      alert('no need commit')
    }
  }

  updateDisplay() {
    let checkedCount = 0
    for (const ingredient of this.checkboxes) {
      if (ingredient.checked) {
        checkedCount++
      }
    }

    if (checkedCount === 0) {
      this.element.checked = false
      this.element.indeterminate = false
    } else if (checkedCount === this.checkboxes.length) {
      this.element.checked = true
      this.element.indeterminate = false
    } else {
      this.element.checked = false
      this.element.indeterminate = true
    }
  }

  get checkboxes() {
    return document.querySelectorAll(`input[type=checkbox][name='${this.element.value}']`)
  }
}
