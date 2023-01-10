import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static outlets = ['input']

  enter(event) {
    const element = event.currentTarget

    this.inputOutlet.value = element.innerText
  }
}
