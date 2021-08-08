import { Controller } from 'stimulus'
import { createApp } from 'vue'

class VueController extends Controller {

  connect() {
    console.debug('connected:', this.identifier)
    this.app.mount(this.element)
  }

  get app() {
    return createApp({})
  }

}

application.register('vue', VueController)
