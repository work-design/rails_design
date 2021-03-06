import { Controller } from 'stimulus'

class OuterController extends Controller {
  static values = {
    url: String,
    params: Object
  }

  connect() {
    console.debug('Outer Controller works!')
  }

  // change
  choose(event) {
    let element = event.currentTarget
    if (element.value) {
      let search_url = new URL(this.urlValue, location.origin)
      search_url.searchParams.set('node_id', element.value)
      search_url.searchParams.set('html_id', element.parentNode.parentNode.id)
      Object.keys(this.paramsValue).forEach(k => {
        search_url.searchParams.set(k, this.paramsValue[k])
      })
      window.xxx = this

      fetch(search_url, {
        method: 'GET',
        headers: {
          Accept: 'text/vnd.turbo-stream.html'
        }
      }).then(response => {
        return response.text()
      }).then(body => {
        this.clear(element.parentNode.parentNode)
        Turbo.renderStreamMessage(body)
      })
    } else {
      this.clear(element.parentNode.parentNode)
    }
  }

  clear(node) {
    let el = node.nextElementSibling
    while (el && el.dataset.title === 'outer_ancestors_input') {
      el.remove()
      el = node.nextElementSibling
    }
  }

}

application.register('outer', OuterController)
