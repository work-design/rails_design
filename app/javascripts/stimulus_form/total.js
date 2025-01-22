import { Controller } from '@hotwired/stimulus'

// 根据数量，计算价格
export default class extends Controller {
  static targets = [
    'reduce',
    'profit', // 按道理，可支持多个
    'total'
  ]

  updateReduce(event) {
    const reduce = event.currentTarget

    if (this.hasTotalTarget) {
      const total = (parseFloat(this.totalTarget.defaultValue || 0) + parseFloat(reduce.value) - parseFloat(reduce.defaultValue || 0))

      if (this.hasProfitTarget) {
        this.totalTarget.value = (total + parseFloat(this.profitTarget.value || 0)).toFixed(2)
      } else {
        this.totalTarget.value = total.toFixed(2)
      }
    }
  }

  updateProfit(event) {
    const profit = event.currentTarget

    if (this.hasTotalTarget && this.hasReduceTarget) {
      this.totalTarget.value = (parseFloat(this.reduceTarget.value || 0) + parseFloat(profit.value)).toFixed(2)
    }
  }

  updateTotal(event) {
    const total = event.currentTarget

    if (this.hasReduceTarget) {
      const reduce = (parseFloat(this.reduceTarget.defaultValue || 0) + parseFloat(total.value) - parseFloat(total.defaultValue || 0))

      if (this.hasProfitTarget) {
        this.reduceTarget.value = (reduce - parseFloat(this.profitTarget.value || 0)).toFixed(2)
      } else {
        this.reduceTarget.value = reduce.toFixed(2)
      }
    }
  }

}
