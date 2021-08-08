import { Controller } from 'stimulus'
import { createApp } from 'vue'

class VueController extends Controller {

  reload(element) {
  }

  connect() {
    console.debug('connected:', this.identifier)
    this.app.mount(this.element)
  }

  get app() {
    const app = createApp({})
    app.config.performance = true
    window.app = app
    return app
  }

}

application.register('vue', VueController)
