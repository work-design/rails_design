import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['quantity', 'budget', 'price']

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

  updateBudgetAmount(event) {
    let budget = event.currentTarget
    let quantity = document.getElementById(budget.id.replace('budget_amount', 'quantity'))
    let result = (budget.value / quantity.value).toFixed(2)

    let price = document.getElementById(budget.id.replace('budget_amount', 'price'))
    if (price) {
      price.value = result
    }
  }

}
