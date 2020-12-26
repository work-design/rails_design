import { Controller } from 'stimulus'

// data-controller="notice"
class NoticeController extends Controller {

  connect() {
    console.debug('Notice Controller works!')
  }

  close() {
    this.element.remove()
  }

}

application.register('notice', NoticeController)
