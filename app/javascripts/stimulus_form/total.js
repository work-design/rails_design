import { Controller } from '@hotwired/stimulus'

// 根据数量，计算价格
export default class extends Controller {
  static targets = [
    'reduce',
    'profit',
    'total'
  ]

  updateReduce(event) {
    const reduce = event.currentTarget

    if (this.hasTotalTarget) {
      this.totalTarget.value = (parseFloat(this.totalTarget.defaultValue || 0) + parseFloat(reduce.value) - parseFloat(reduce.defaultValue || 0)).toFixed(2)
    }
  }

  updateProfit(event) {
    const profit = event.currentTarget

    if (this.hasTotalTarget && this.hasReduceTarget) {
      this.totalTarget.value = (parseFloat(this.reduceTarget.value || 0) + parseFloat(profit.value)).toFixed(2)
    }
  }

  updateTotal(event) {
    let total = event.currentTarget

    if (this.hasReduceTarget) {
      this.reduceTarget.value = (parseFloat(this.reduceTarget.defaultValue || 0) + parseFloat(total.value) - parseFloat(total.defaultValue || 0)).toFixed(2)
    }
  }

}
