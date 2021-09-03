import stickybits from 'stickybits'
import { Controller } from '@hotwired/stimulus'

// data-controller="menu"
export default class extends Controller {

  connect() {
    stickybits(this.element)
  }

}
