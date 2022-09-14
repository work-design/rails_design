import { Controller } from '@hotwired/stimulus'

// 根据总额，价格，计算可买数量
export default class extends Controller {
  static targets = ['quantity', 'budget', 'price']
  static values = {
    total: Number
  }

  updatePrice(event) {
    const price = event.currentTarget
    let quantity = document.getElementById(price.id.replace('price', 'quantity'))
    let result = (price.value * quantity.value).toFixed(2)

    let budget = document.getElementById(price.id.replace('price', 'budget_amount'))
    if (budget) {
      budget.value = result
    }
  }

  updateQuantity(event) {
    let quantity = event.currentTarget
    let price = document.getElementById(quantity.id.replace('quantity', 'price'))
    let result = (price.value * quantity.value).toFixed(2)

    let budget = document.getElementById(quantity.id.replace('quantity', 'budget_amount'))
    if (budget) {
      budget.value = result
    }
  }

  divide(event) {
    console.log('ssssss')
    this.quantityTarget.innerText = Math.floor(this.totalValue / event.currentTarget.value)
  }

}
