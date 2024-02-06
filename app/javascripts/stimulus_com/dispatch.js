import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    id: String,
    controller: String,
    action: String
  }

  stop() {
    this.outlet['stop']()
  }

  get outlet() {
    return document.getElementById(this.idValue).controller(this.controllerValue)
  }

}
