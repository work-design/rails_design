import { Controller } from 'stimulus'

// data-controller="notice"
class NoticeController extends Controller {

  connect() {
    console.debug('connected:', this.identifier)
  }

  close() {
    this.element.remove()
  }

}

application.register('notice', NoticeController)
