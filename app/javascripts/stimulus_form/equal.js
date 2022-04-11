import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['goal']

  update(event) {
    const ele = event.currentTarget

    if (parseFloat(ele.value) > parseFloat(this.goalTarget.value)) {
      this.goalTarget.value = ele.value
    }
  }

}
