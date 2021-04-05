import { Controller } from 'stimulus'

class FormerController extends Controller {
  static values = {
    id: String
  }

  connect() {
    console.debug(this.identifier, 'connected!')
  }

  original() {
    let ele = document.getElementById(this.idValue)
    let data = new FormData(ele)
  }

}

application.register('former', FormerController)
