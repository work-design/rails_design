import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  csrfToken() {
    const meta = document.querySelector('meta[name=csrf-token]')
    return meta && meta.content
  }

  get(url) {
    this.request(url, 'GET')
  }

  post(url, body, headers) {
    this.request(url, 'POST', body, {'X-CSRF-Token': this.csrfToken(), ...headers})
  }

  patch(url, body, headers) {
    this.request(url, 'PATCH', body, {'X-CSRF-Token': this.csrfToken(), ...headers})
  }

  request(url, method, body, headers) {
    fetch(url, {
      credentials: 'include',
      method: method.toUpperCase(),
      headers: {
        Accept: 'text/vnd.turbo-stream.html',
        ...headers
      },
      body: body
    }).then(response => {
      return response.text()
    }).then(body => {
      Turbo.renderStreamMessage(body)
    })
  }

  doRequest(input) {
    const url = new URL(this.urlValue, location.origin)
    if (this.hasMethodValue && ['POST', 'PUT', 'PATCH'].includes(this.methodValue.toUpperCase())) {
      const body = new FormData()
      body.append(input.name, input.value)
      this.request(url, this.methodValue, body, {'X-CSRF-Token': this.csrfToken()})
    } else {
      url.searchParams.set(input.name, input.value)
      this.get(url)
    }
  }

  get locale() {
    return document.querySelector('html').lang
  }

}