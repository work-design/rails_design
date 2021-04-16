import { Controller } from 'stimulus'
import weui from 'weui.js'

class WeuiPickerController extends Controller {
  static values = {
    id: String,
    url: String
  }

  connect() {
    console.debug(this.identifier, 'connected!')
  }

  // focus->weui#getFocus
  getFocus() {
    document.activeElement.blur()
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
      id: 'multiPickerBtn',
      title: '多列选择器',
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

application.register('weui-picker', WeuiPickerController)
