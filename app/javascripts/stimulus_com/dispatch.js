import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['control']
  static values = {
    control: String
  }

  connect() {

  }

}
