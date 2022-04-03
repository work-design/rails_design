import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['output']
  static classes = ['remove', 'add']

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

    if (this.size >= this.range[1] && this.lastItem) {
      this.toggleOff(this.lastItem)
    }

    let order = this.data.get('order')
    if (order.length > 0) {
      order = order.split(',')
    } else {
      order = []
    }
    order.push(checkbox.value)
    this.data.set('order', order)
  }

  toggleOff(checkbox) {
    checkbox.checked = false
    this.toggleOffCss(checkbox)
  }

  toggleOffCss(checkbox) {
    const cl = checkbox.parentElement.classList
    cl.remove('weui-btn_primary')
    cl.add('weui-btn_default')

    let order = this.data.get('order')
    if (order.length > 0) {
      order = order.split(',')
    } else {
      order = []
    }
    let index = order.indexOf(checkbox.value)
    if (index > -1) {
      order.splice(index, 1)
    }
    this.data.set('order', order)
  }

  disable() {
    const input = this.outputTarget
    input.disabled = true
    input.parentElement.parentElement.classList.add('weui-cell_disabled')
  }

  get range() {
    const arr = []
    const r = this.data.get('range').split(',')
    r.forEach(i => {
      arr.push(parseInt(i))
    })
    return arr
  }

  get size() {
    return this.data.get('order').split(',').length
  }

  get lastItem() {
    const id = this.data.get('order').split(',')[0]
    return document.getElementById(`part_${id}`)
  }
}
