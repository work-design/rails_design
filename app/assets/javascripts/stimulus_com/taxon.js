import { Controller } from 'stimulus'

export default class extends Controller {
  static values = {
    url: String,
    title: String,
    params: Object
  }

  // change
  choose(event) {
    let ele = event.currentTarget
    if (ele.value === '' || ele.value === null) {
      this.clear(this.element)
    } else {
      let search_url = new URL(this.urlValue, location.origin)
      search_url.searchParams.set('node_id', ele.value)
      search_url.searchParams.set('html_id', this.element.id)
      Object.keys(this.paramsValue).forEach(k => {
        search_url.searchParams.set(k, this.paramsValue[k])
      })

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

  clear(node) {
    let el = node.nextElementSibling
    while (el && el.dataset['taxonTitleValue'] === this.titleValue) {
      el.remove()
      el = node.nextElementSibling
    }
  }

}
