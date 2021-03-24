import { Controller } from 'stimulus'

class TaxonController extends Controller {
  static values = {
    url: String,
    title: String,
    params: Object
  }

  connect() {
    console.debug(this.identifier, 'connected!')
  }

  // change
  choose(event) {
    let ele = event.currentTarget
    if (ele.value) {
      let search_url = new URL(this.urlValue, location.origin)
      search_url.searchParams.set('node_id', ele.value)
      search_url.searchParams.set('html_id', this.element.id)
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
        this.clear(this.element)
        Turbo.renderStreamMessage(body)
      })
    } else {
      this.clear(this.element)
    }
  }

  clear(node) {
    let el = node.nextElementSibling
    while (el && el.dataset['taxon-title-value'] === this.titleValue) {
      el.remove()
      el = node.nextElementSibling
    }
  }

}

application.register('taxon', TaxonController)
