import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    id: String,
    url: String
  }

  // focus->weui-picker#getData
  getData(event) {
    document.activeElement.blur()  // disable input
    const ele = event.currentTarget

    fetch(this.urlValue, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }).then(response => {
      return response.json()
    }).then(body => {
      this.picker(body, ele)
    })
  }

}
