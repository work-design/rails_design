import { Controller } from '@hotwired/stimulus'
import weui from 'weui.js'

export default class extends Controller {
  static values = {
    id: String,
    url: String
  }

  connect() {
    console.debug('connected:', this.identifier)
  }

  // focus->weui-picker#getData
  getData(event) {
    document.activeElement.blur()  // disable input
    let ele = event.currentTarget

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

  picker(data, ele) {
    weui.picker(data.values, {
      id: data.default.join('_'),
      title: '多列选择器',
      defaultValue: data.default,
      depth: 3,
      onChange: result => {
        console.log('changed', result)
      },
      onConfirm: result => {
        let val = result[result.length - 1]
        let names = result.map(item => {
          return item.label
        })
        console.debug('Val', val)
        document.getElementById(this.idValue).value = val.value
        ele.value = names.join(' ')
      },
      onClose: () => {
      }
    })
  }

}
