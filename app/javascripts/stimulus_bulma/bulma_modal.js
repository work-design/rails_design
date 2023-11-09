import { Controller } from '@hotwired/stimulus'

// data-controller="modal"
export default class extends Controller {

  connect() {
    document.documentElement.classList.add('is-clipped')
  }

  close() {
    this.element.remove()
  }

  disconnect() {
    document.documentElement.classList.remove('is-clipped')
  }

  // 关闭前检查下有没有未提交的表单
  closeCheck() {
  }

}
