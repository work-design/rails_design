import { Controller } from '@hotwired/stimulus'

// 用于对指定 form 的数据进行提交
export default class extends Controller {
  static values = {
    id: String,
    url: String
  }

  submit() {
    const ele = document.getElementById(this.idValue)
    const data = new FormData(ele)

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
