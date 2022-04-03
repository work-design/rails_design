import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    content: String
  }

  alert() {
    alert(this.contentValue)
  }

}
