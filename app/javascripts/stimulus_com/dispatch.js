import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    id: String,
    controller: String,
    action: String,
    click: String
  }
  static outlets = ['modal']

  stop() {
    this.outlet['stop']()
  }

  doClick() {
    this.modalOutlet[this.clickValue]()
  }

  get outlet() {
    return document.getElementById(this.idValue).getController(this.controllerValue)
  }

}
