import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['start', 'finish']

  // action
  time(event) {
    const el = event.currentTarget
    const start = el.dataset.startAt
    const finish = el.dataset.finishAt

    this.startTarget.value = start
    this.finishTarget.value = finish
  }

}

