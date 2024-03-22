import { Controller } from '@hotwired/stimulus'

// data-controller="modal"
export default class extends Controller {

  connect() {
    document.documentElement.classList.add('is-clipped')
  }

  close() {
    if (this.closeCheck()) {
      this.element.remove()
    }
  }

  hide() {
    if (this.closeCheck()) {
      this.element.classList.remove('is-active')
      document.documentElement.classList.remove('is-clipped')
    }
  }

  show() {
    this.element.classList.add('is-active')
  }

  disconnect() {
    document.documentElement.classList.remove('is-clipped')
  }

  // 关闭前检查下有没有未提交的表单
  closeCheck() {
    let arr = []
    Array.from(this.element.getElementsByTagName('input')).forEach(el => {
      if (el.value !== el.defaultValue && el.labels[0]) {
        arr.push(el.labels[0].innerText)
      }
    })

    return arr.length === 0 || confirm(`${arr.join(',')} is changed, Are You Sure?`)
  }

}
