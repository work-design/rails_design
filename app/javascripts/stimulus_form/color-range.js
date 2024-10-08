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
    const color = `hsl(${this.hueTarget.value}, ${this.saturationTarget.value}%, ${this.lightnessTarget.value}%)`
    const darker = (this.lightnessTarget.value * 0.8).toFixed()
    const colorDarker = `hsl(${this.hueTarget.value}, ${this.saturationTarget.value}%, ${darker}%)`

    this.saturationTarget.setAttribute('style', `background-image: linear-gradient(to right, hsl(${this.hueTarget.value}, 0%, ${this.lightnessTarget.value}%), hsl(${this.hueTarget.value}, 50%, ${this.lightnessTarget.value}%), hsl(${this.hueTarget.value}, 100%, ${this.lightnessTarget.value}%))`)
    this.lightnessTarget.setAttribute('style', `background-image: linear-gradient(to right, hsl(${this.hueTarget.value}, ${this.saturationTarget.value}%, 0%), hsl(${this.hueTarget.value}, ${this.saturationTarget.value}%, 50%), hsl(${this.hueTarget.value}, ${this.saturationTarget.value}%, 100%))`)

    document.getElementById(this.idValue).setAttribute('style', `--admin-menu: ${color}; --admin-menu-darker: ${colorDarker}`)
  }

}
