import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['node']
  static values = {
    index: Number,
    label: Boolean
  }

  // data-action="click->field#add"
  add() {
    const el = this.element.cloneNode(true)
    const label = el.querySelector('label')
    if (!this.labelValue && label) {
      label.remove()
    }
    const next = this.element.nextElementSibling
    let addIndex
    if (next) {
      const nextItem = next.getController(this.identifier)
      if (nextItem && nextItem.indexValue > this.indexValue) {
        addIndex = (nextItem.indexValue - this.indexValue) / 2
      } else {
        addIndex = 1
      }
    } else {
      addIndex = 1
    }

    const nextIndex = this.indexValue + addIndex
    el.setAttribute('data-field-index-value', nextIndex)
    el.querySelectorAll('input, select').forEach(input => {
      input.name = input.name.replace(`[${this.indexValue}]`, `[${nextIndex}]`)
      if (input.id) {
        input.id = input.id.replace(`${this.indexValue}`, `${nextIndex}`)
      }
      input.value = input.defaultValue
    })

    if (this.element.parentNode) {
      this.element.parentNode.insertBefore(el, next)
    }
  }

  remove() {
    this.element.remove()
  }

}
