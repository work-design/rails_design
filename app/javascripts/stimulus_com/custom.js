import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static classes = ['remove', 'add']
  static values = {
    order: Array,
    only: Boolean
  }

  toggle(event) {
    const checkbox = event.currentTarget
    if (checkbox.checked) {
      this.toggleOn(checkbox)
    } else if (!checkbox.checked) {
      this.toggleOffCss(checkbox)
    }

    checkbox.form.requestSubmit()
  }

  toggleOn(checkbox) {
    const cl = checkbox.parentElement.classList
    cl.remove('weui-btn_default')
    cl.add('weui-btn_primary')

    if (this.onlyValue) {
      this.toggleOffOther(checkbox)
    }
  }

  toggleOff(checkbox) {
    checkbox.checked = false
    this.toggleOffCss(checkbox)
  }

  toggleOffCss(checkbox) {
    checkbox.labels.forEach((i) => {
      i.classList.remove('weui-btn_primary')
      i.classList.add('weui-btn_default')
    })
  }

  toggleOnDisable(input) {
    input.disabled = true
    input.labels.forEach((i) => {
      i.classList.add('weui-cell_disabled')
    })
  }

  toggleOffDisable(input) {
    if (input.disabled) {
      input.disabled = false
      input.labels.forEach((i) => {
        i.classList.remove('weui-cell_disabled')
      })
    }
  }

  toggleOffOther(checkbox) {
    const items = checkbox.form.elements[checkbox.name]
    let toRemove
    for (let i of items) {
      if (i.dataset.partTaxonId === checkbox.dataset.partTaxonId && i !== checkbox) {
        if (i.type === 'checkbox') {
          this.toggleOff(i)
          this.toggleOffDisable(i)
        } else if (i.type === 'hidden') {
          toRemove = i
        }
      }
    }
    if (toRemove) {
      toRemove.remove()
    }
  }

}
