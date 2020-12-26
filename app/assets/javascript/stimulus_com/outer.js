import { Controller } from 'stimulus'

class OuterController extends Controller {

  connect() {
    console.debug('Outer Controller works!')
  }

  // change
  choose(event) {
    let element = event.currentTarget
    if (element.value) {
      let search_url = new URL(location.origin + '/nodes/outer')
      search_url.searchParams.set('node_id', element.value)
      search_url.searchParams.set('node_type', element.dataset['nodeType'])
      search_url.searchParams.set('scope', element.dataset['scope'])
      search_url.searchParams.set('method', element.dataset['method'])
      search_url.searchParams.set('outer', element.dataset['outer'])
      search_url.searchParams.set('html_id', element.parentNode.parentNode.id)
      if (element.dataset['index']) {
        search_url.searchParams.set('index', element.dataset['index'])
      }

      Rails.ajax({
        url: search_url,
        type: 'GET',
        dataType: 'script'
      })
    } else {
      let el = element.parentNode.parentNode.nextElementSibling
      while (el && el.dataset.title === 'outer_ancestors_input') {
        el.remove()
        el = node.nextElementSibling
      }
    }
  }

}

application.register('outer', OuterController)
