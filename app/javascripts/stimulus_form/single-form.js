import BaseController from '../base_controller'

// 底部表单
export default class extends BaseController {
  static targets = ['input']
  static values = {
    id: { type: String, default: 'bottom-field' },
    url: String
  }

  connect() {
    window.addEventListener('resize', () => {
      // 强制触发重绘
      document.body.style.display = 'none';
      document.body.offsetHeight; // 触发重绘
      document.body.style.display = '';
    });
  }

  prepare() {
    const clonedItem = this.inputTarget.cloneNode(true)
    this.target.appendChild(clonedItem)
    clonedItem.focus()
  }

  get target() {
    return document.getElementById(this.idValue)
  }
}
