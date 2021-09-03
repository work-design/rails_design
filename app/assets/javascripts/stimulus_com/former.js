import { Controller } from 'stimulus'

export default class extends Controller {
  static values = {
    id: String,
    url: String
  }

  submit() {
    let ele = document.getElementById(this.idValue)
    let data = new FormData(ele)

    fetch(this.urlValue, {
      method: 'POST',
      headers: {
        Accept: 'text/vnd.turbo-stream.html',
        'X-CSRF-Token': this.csrfToken()
      },
      body: data
    }).then(response => {
      return response.text()
    }).then(body => {
      Turbo.renderStreamMessage(body)
    })
  }
}
