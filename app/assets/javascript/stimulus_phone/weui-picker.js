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
  getData() {
    fetch(this.urlValue, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }).then(response => {
      return response.json()
    }).then(body => {
      this.picker(body)
    })
  }

  picker(data) {
    weui.picker(data.values, {
      id: 'multiPickerBtn',
      title: '多列选择器',
      onChange: result => {
        console.log(result)
      },
      onConfirm: result => {
        var values = result.map(item => {
          return item.value
        })
        var val = values[values.length - 1]
        document.getElementById(this.idValue).value = val
        console.log(val)
      },
      onClose: () => {
      }
    })
  }

}

application.register('weui-picker', WeuiPickerController)
