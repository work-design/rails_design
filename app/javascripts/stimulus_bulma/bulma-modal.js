import BaseController from '../base_controller'
const I18N = {
  zh: '已改变，确认关闭？',
  en: ' is changed, Are You Sure?'
}

// data-controller="modal"
export default class extends BaseController {

  connect() {
    document.documentElement.classList.add('clipped')
  }

  close() {
    if (this.closeCheck()) {
      this.element.remove()
    }
  }

  submitClose(e) {
    const ele = e.currentTarget
    if (this.closeCheck()) {
      ele.form.requestSubmit()
      this.element.remove()
    }
  }

  hide() {
    if (this.closeCheck()) {
      this.element.classList.remove('is-active')
      document.documentElement.classList.remove('clipped')
    }
  }

  show() {
    this.element.classList.add('is-active')
  }

  toggle() {
    if (this.element.classList.contains('is-active')) {
      this.close()
    } else {
      this.show()
    }
  }

  disconnect() {
    document.documentElement.classList.remove('clipped')
  }

  // 关闭前检查下有没有未提交的表单
  closeCheck() {
    let arr = []
    Array.from(this.element.getElementsByTagName('input')).forEach(el => {
      if (el.value === el.defaultValue) {
        return
      }
      if (el.type === 'datetime-local' && new Date(el.value).getTime() === new Date(el.defaultValue).getTime()) {
        return
      }
      if (el.labels[0]) {
        arr.push(el.labels[0].innerText)
      }
    })

    return arr.length === 0 || confirm(`${arr.join(',')}${I18N[this.locale]}`)
  }

}
