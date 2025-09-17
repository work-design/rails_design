import { Controller } from '@hotwired/stimulus'

// 底部表单
export default class extends Controller {
  static targets = ['input']

  inputTargetConnected(ele) {
    ele.removeAttribute('id')
    ele.enterKeyHint = 'done'
    ele.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault()
        ele.form.requestSubmit()
      }
    })
    ele.addEventListener('focus', e => {
      if (['textarea', 'text'].includes(ele.type)) {
        ele.setSelectionRange(ele.value.length, ele.value.length)
      }
    })
  }

}
