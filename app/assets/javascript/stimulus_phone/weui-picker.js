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
      onChange: result => {
        console.log(result)
      },
      onConfirm: result => {
        let values = result.map(item => {
          return item.value
        })
        console.debug('values', values)
        let val = values[values.length - 1]
        document.getElementById(this.idValue).value = val
        ele.value = val
        console.log(val)
      },
      onClose: () => {
      }
    })
  }

}

application.register('weui-picker', WeuiPickerController)
