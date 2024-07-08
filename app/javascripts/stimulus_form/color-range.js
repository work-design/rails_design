import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['color']
  // data-action="click->field#add"
  hue(e) {
    const ele = e.currentTarget
    this.colorTargets.forEach(el => {
      el.setAttribute('style', `background-color: hsl(${ele.value}, 50%, 50%)`)
    })
  }

  saturation(e) {
    const ele = e.currentTarget
    this.colorTargets.forEach(el => {
      el.setAttribute('style', `background-color: hsl(${ele.value}, 50%, 50%)`)
    })
  }

  luminance() {
    const ele = e.currentTarget
    this.colorTargets.forEach(el => {
      el.setAttribute('style', `background-color: hsl(${ele.value}, 50%, 50%)`)
    })
  }

}
