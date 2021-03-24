import { Controller } from 'stimulus'

// data-controller="notice"
class NoticeController extends Controller {

  connect() {
    console.debug(this.identifier, 'connected!')
  }

  close() {
    this.element.remove()
  }

}

application.register('notice', NoticeController)
