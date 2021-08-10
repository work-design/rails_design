import stickybits from 'stickybits'
import { Controller } from 'stimulus'

// data-controller="menu"
export default class extends Controller {

  connect() {
    console.debug('connected:', this.identifier)
    stickybits(this.element)
  }

}
