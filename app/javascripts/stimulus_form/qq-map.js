import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    name: String,
    index: Number,
    key: String
  }
  static targets = ['load']

  connect() {
    const center = new TMap.LatLng(39.984120, 116.307484)
    this.map = new TMap.Map(this.element, {
      center: center,
      zoom: 17.2
    })
  }

  selected(event) {
    this.doSelected(event)
    //this.element.remove()
  }

  select(event) {
    this.doSelected(event)
  }

  doSelected(event) {
    console.log('selected', event)
    const loc = event.data
    if (loc && loc.module === 'locationPicker') {
      if (this.hasIndexValue) {
        document.getElementById(`${this.nameValue}_${this.indexValue}_lat`).value = loc.latlng.lat
        document.getElementById(`${this.nameValue}_${this.indexValue}_lng`).value = loc.latlng.lng
        document.getElementById(`${this.nameValue}_${this.indexValue}_poiname`).value = loc.poiname
        document.getElementById(`${this.nameValue}_${this.indexValue}_poiaddress`).value = loc.poiaddress
        document.getElementById(`${this.nameValue}_${this.indexValue}_cityname`).value = loc.cityname

        document.getElementById(`${this.indexValue}_name`).innerText = loc.poiname
      } else {
        document.getElementById(`${this.nameValue}_lat`).value = loc.latlng.lat
        document.getElementById(`${this.nameValue}_lng`).value = loc.latlng.lng
        document.getElementById(`${this.nameValue}_poiname`).value = loc.poiname
        document.getElementById(`${this.nameValue}_poiaddress`).value = loc.poiaddress
        document.getElementById(`${this.nameValue}_cityname`).value = loc.cityname
      }
    }
  }

}
