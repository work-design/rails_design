import { Controller } from 'stimulus'
import { createApp } from 'vue'

class VueController extends Controller {

  reload(element) {

  }

  get xx() {
    const app = createApp({})
    app.config.performance = true
    window.app = app
  }

  connect() {
    console.debug('connected:', this.identifier)

    app.mount('#app')
  }

}

application.register('vue', VueController)
