import { Controller } from '@hotwired/stimulus'

// 底部表单
export default class extends Controller {
  static targets = ['input']

  inputTargetConnected(ele) {
    if (ele.tagName === 'TEXTAREA' && ele.enterKeyHint === 'done') {
      ele.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          ele.form.requestSubmit()
        }
      })
    }
  }

}
