import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    url: String,
    input: String,
    params: Object
  }

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

    if (this.hasInputValue) {
      body.append(this.inputValue, input.value)
    } else {
      body.append(input.name, input.value)
    }

    if (this.hasParamsValue) {
      Object.keys(this.paramsValue).forEach(k => {
        body.append(k, this.paramsValue[k])
      })
    }

    this.request(
      this.urlValue,
      'POST',
      body,
      { 'X-CSRF-Token': this.csrfToken() }
    )
  }

  inputGet(input) {
    let url
    if (input.dataset.url) {
      url = new URL(input.dataset.url, location.origin)
    } else {
      url = new URL(this.urlValue, location.origin)
    }

    if (this.hasInputValue) {
      url.searchParams.set(this.inputValue, input.value)
    } else {
      url.searchParams.set(input.name, input.value)
    }

    if (this.hasParamsValue) {
      Object.keys(this.paramsValue).forEach(k => {
        url.searchParams.set(k, this.paramsValue[k])
      })
    }

    this.get(url)
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

  get locale() {
    return document.querySelector('html').lang
  }

}