import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String,
    params: Object
  }

  cancel(event) {
    event.preventDefault()
    Turbo.visit(location.href, { action: 'replace' })
  }

  // 用于兼容 rails ujs data-method 的逻辑
  link(event) {
    event.preventDefault()
    const ele = event.currentTarget
    const method = (ele.dataset.method && ele.dataset.method.toUpperCase()) || 'GET'

    fetch(ele.href, {
      method: method,
      headers: {
        Accept: 'text/vnd.turbo-stream.html'
      }
    }).then(response => {
      return response.text()
    }).then(body => {
      Turbo.renderStreamMessage(body)
    })
  }

  stream(event) {
    const ele = event.currentTarget
    const search_url = new URL(this.urlValue, location.origin)
    search_url.searchParams.set('node_id', ele.value)
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
      Turbo.renderStreamMessage(body)
    })
  }

}
