import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    name: String,
    index: Number
  }
  static targets = ['load']

  selected(event) {
    const loc = event.data
    if (loc && loc.module === 'locationPicker') {
      document.getElementById(`${this.nameValue}_${this.indexValue}_lat`).value = loc.latlng.lat
      document.getElementById(`${this.nameValue}_${this.indexValue}_lng`).value = loc.latlng.lng
      document.getElementById(`${this.nameValue}_${this.indexValue}_poiname`).value = loc.poiname
      document.getElementById(`${this.nameValue}_${this.indexValue}_poiaddress`).value = loc.poiaddress
      document.getElementById(`${this.nameValue}_${this.indexValue}_cityname`).value = loc.cityname

      document.getElementById(`${this.indexValue}_name`).innerText = loc.poiname

      this.element.remove()
    }
  }

}
