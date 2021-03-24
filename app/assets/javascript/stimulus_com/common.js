import { Controller } from 'stimulus'

// data-controller="common"
class CommonController extends Controller {

  connect() {
    console.debug(this.identifier, 'connected!')
  }

  cancel(event) {
    event.preventDefault()
    Turbo.visit(location.href, { action: 'replace' })
  }

  stream(event) {
    event.presentDefault()
    let link = event.currentTarget

    fetch(search_url, {
      method: 'GET',
      headers: {
        Accept: 'text/vnd.turbo-stream.html'
      }
    }).then(response => {
      return response.text()
    }).then(body => {
      this.clear(this.element)
      Turbo.renderStreamMessage(body)
    })
  }

}

application.register('common', CommonController)
