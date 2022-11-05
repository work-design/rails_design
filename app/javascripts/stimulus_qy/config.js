import { Controller } from '@hotwired/stimulus'
import VConsole from 'vconsole'

export default class extends Controller {
  static values = {
    options: Object,
    debug: Boolean,
    apis: Array
  }

  connect() {
    if (this.debugValue) {
      this.vconsole = new VConsole()
    }
  }

  disconnect() {
    if (this.debugValue) {
      this.vconsole.destroy()
    }
    this.script.remove()
    this.work_script.remove()
  }

}
