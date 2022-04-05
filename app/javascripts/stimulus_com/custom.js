import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['output']
  static classes = ['remove', 'add']
  static values = {
    order: Array,
    one: Boolean
  }

  toggle(event) {
    const checkbox = event.currentTarget
    if (checkbox.checked) {
      this.toggleOn(checkbox)
    } else if (!checkbox.checked) {
      this.toggleOffCss(checkbox)
    }

    this.submit(checkbox.form)
  }

  toggleOn(checkbox) {
    const cl = checkbox.parentElement.classList
    cl.remove('weui-btn_default')
    cl.add('weui-btn_primary')

    if (this.oneValue) {
      this.toggleOther(checkbox)
    }
  }

  toggleOff(checkbox) {
    checkbox.checked = false
    this.toggleOffCss(checkbox)
  }

  toggleOffCss(checkbox) {
    const cl = checkbox.parentElement.classList
    cl.remove('weui-btn_primary')
    cl.add('weui-btn_default')
  }

  disable() {
    const input = this.outputTarget
    input.disabled = true
    input.parentElement.parentElement.classList.add('weui-cell_disabled')
  }

  toggleOther(checkbox) {
    const items = checkbox.form.elements[checkbox.name]
    items.forEach((i) => {
      if (i.dataset.partTaxonId === checkbox.partTaxonId) {
        this.toggleOff(i)
      }
    })
  }

}
