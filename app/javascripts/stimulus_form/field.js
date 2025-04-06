import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    index: Number,
    label: { type: String, default: 'label.field-label' },
    body: { type: String, default: 'div.field-body' }
  }

  // data-action="click->field#add"
  add() {
    const clonedItem = this.element.cloneNode(true)

    // 移除 label 文字
    const label = clonedItem.querySelector(this.labelValue)
    if (label) {
      label.innerText = ''
    }

    // 移除标记不需要复制的内容
    const body = clonedItem.querySelector(this.bodyValue)
    if (body) {
      Array.from(body.children).forEach(el => {
        if (el.dataset.fieldClone === 'false') {
          el.remove()
        }
      })
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
    clonedItem.setAttribute('data-field-index-value', nextIndex)
    clonedItem.querySelectorAll('input, select').forEach(input => {
      input.name = input.name.replace(`[${this.indexValue}]`, `[${nextIndex}]`)
      if (input.id) {
        input.id = input.id.replace(`${this.indexValue}`, `${nextIndex}`)
      }
      if (input.parentNode.id) {
        input.parentNode.id = input.parentNode.id.replace(`${this.indexValue}`, `${nextIndex}`)
      }
      input.value = input.defaultValue
      input.autofocus = true
      if (input.type === 'text') {
        input.setSelectionRange(0, input.value.length)
      }
    })

    if (this.element.parentNode) {
      this.element.parentNode.insertBefore(clonedItem, next)
    }
  }

  remove() {
    this.element.remove()
  }

}
