import { Controller } from '@hotwired/stimulus'

// 根据数量，计算价格
export default class extends Controller {
  static targets = ['reduce', 'total']

  updateReduce(event) {
    const reduce = event.currentTarget

    if (this.hasTotalTarget) {
      this.totalTarget.value = (parseFloat(this.totalTarget.defaultValue) + parseFloat(reduce.value) - parseFloat(reduce.defaultValue)).toFixed(2)
    }
  }

  updateTotal(event) {
    let total = event.currentTarget

    if (this.hasReduceTarget) {
      this.reduceTarget.value = (parseFloat(this.reduceTarget.defaultValue) + parseFloat(total.value) - parseFloat(total.defaultValue)).toFixed(2)
    }
  }

}
