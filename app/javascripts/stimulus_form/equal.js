import { Controller } from '@hotwired/stimulus'
import { DateTime } from 'luxon'

export default class extends Controller {
  static targets = ['goal']
  static values = {
    plus: Object
  }

  update(event) {
    const ele = event.currentTarget

    if (parseFloat(ele.value) > parseFloat(this.goalTarget.value)) {
      this.goalTarget.value = ele.value
    }
  }

  updateTime(event) {
    const ele = event.currentTarget
    const dt = DateTime.fromISO(ele.value).plus(this.plusValue).toFormat("yyyy-MM-dd'T'HH:mm:ss")
    if (this.goalTarget.value === this.goalTarget.defaultValue) {
      this.goalTarget.value = dt
    }
  }

}
