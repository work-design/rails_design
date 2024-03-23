import { Controller } from '@hotwired/stimulus'

// 根据数量，计算价格
export default class extends Controller {
  static targets = ['quantity', 'total', 'single']

  updateSingle(event) {
    const single = event.currentTarget
    let quantity = this.quantityTarget
    let result = (single.value * quantity.value).toFixed(2)

    if (this.hasTotalTarget) {
      this.totalTarget.value = result
    }
  }

  updateQuantity(event) {
    let quantity = event.currentTarget
    let single = this.singleTarget
    let result = (single.value * quantity.value).toFixed(2)

    if (this.hasTotalTarget) {
      this.totalTarget.value = result
    }
  }

  updateTotal(event) {
    let total = event.currentTarget
    let quantity = this.quantityTarget
    let result = (total.value / quantity.value).toFixed(2)

    if (this.hasSingleTarget) {
      this.singleTarget.value = result
    }
  }

}
