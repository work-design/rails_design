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
    this.request(
      url,
      'POST',
      body,
      { 'Content-Type': 'application/json', 'X-CSRF-Token': this.csrfToken(), ...headers }
    )
  }

  patch(url, body, headers) {
    this.request(
      url,
      'PATCH',
      body,
      { 'Content-Type': 'application/json', 'X-CSRF-Token': this.csrfToken(), ...headers }
    )
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

  formPost(form) {
    this.request(
      this.urlValue,
      'POST',
      new FormData(form),
      { 'X-CSRF-Token': this.csrfToken() }
    )
  }

  inputPost(input) {
    const body = new FormData()
    body.append(input.name, input.value)
    this.request(
      this.urlValue,
      'POST',
      body,
      { 'X-CSRF-Token': this.csrfToken() }
    )
  }

  inputGet(input) {
    const url = new URL(this.urlValue, location.origin)
    url.searchParams.set(input.name, input.value)
    this.get(url)
  }

  get locale() {
    return document.querySelector('html').lang
  }

}