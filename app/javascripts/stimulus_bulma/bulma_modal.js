import { Controller } from '@hotwired/stimulus'

// data-controller="modal"
export default class extends Controller {

  connect() {
    document.documentElement.classList.add('is-clipped')
  }

  close() {
    const label = this.closeCheck()

    if (!label || confirm(`${label} is changed, Are You Sure?`)) {
      this.element.remove()
    }
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

    return arr.join(',')
  }

}
