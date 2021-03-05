import { Controller } from 'stimulus'

class TaxonController extends Controller {

  connect() {
    console.debug('Taxon Controller works!')
  }

  // change->
  choose(event) {
    let element = event.currentTarget
    if (element.value) {
      let search_url = new URL(location.origin + '/nodes/children')
      search_url.searchParams.set('node_id', element.value)
      search_url.searchParams.set('node_type', element.dataset['type'])
      search_url.searchParams.set('method', element.dataset['method'])
      search_url.searchParams.set('html_id', element.parentNode.parentNode.id)
      if (element.dataset['index']) {
        search_url.searchParams.set('index', element.dataset['index'])
      }
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
    while (el && el.dataset.title === 'parent_ancestors_input') {
      el.remove()
      el = node.nextElementSibling
    }
  }

}

application.register('taxon', TaxonController)
