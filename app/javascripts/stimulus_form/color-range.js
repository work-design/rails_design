import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['hue', 'saturation', 'lightness']
  static values = {
    id: String
  }
  // data-action="click->field#add"
  hue() {
    this.changeAll()
  }

  saturation() {
    this.changeAll()
  }

  lightness() {
    this.changeAll()
  }

  changeAll() {
    [this.hueTarget, this.saturationTarget, this.lightnessTarget].forEach(el => {
      const color = `hsl(${this.hueTarget.value}, ${this.saturationTarget.value}%, ${this.lightnessTarget.value}%)`
      const darker = (this.lightnessTarget.value * 0.8).toFixed()
      console.log('-----', darker)
      const colorDarker = `hsl(${this.hueTarget.value}, ${this.saturationTarget.value}%, ${darker}%)`
      el.setAttribute('style', `background-color: ${color}`)
      document.getElementById(this.idValue).setAttribute('style', `--admin-menu: ${color}; --admin-menu-darker: ${colorDarker}`)
    })
  }

}
