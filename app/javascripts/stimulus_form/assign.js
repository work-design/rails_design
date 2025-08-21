import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    goal: String
  }

  commit(e) {
    document.getElementById(this.goalValue).value = e.currentTarget.value
  }

}