import { Controller } from 'stimulus'

// data-controller="common"
class CommonController extends Controller {
  static values = {
    url: String,
    params: Object
  }

  connect() {
    console.debug(this.identifier, 'connected!')
  }

  cancel(event) {
    event.preventDefault()
    Turbo.visit(location.href, { action: 'replace' })
  }

  // 用于兼容 rails ujs data-method 的逻辑
  link(event) {
    event.preventDefault()
    let ele = event.currentTarget
    let method = (ele.dataset.method && ele.dataset.method.toUpperCase()) || 'GET'

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
    let ele = event.currentTarget
    let search_url = new URL(this.urlValue, location.origin)
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

application.register('common', CommonController)
