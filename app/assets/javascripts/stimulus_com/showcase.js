import { Controller } from 'stimulus'

// 商品橱窗展示，
// 点击小图显示对应图片
// 点击切换箭头，显示上一张或者下一张图片
export default class extends Controller {
  static targets = [
    'window'
  ]
  static classes = [
    'hover'
  ]

  connect() {
    console.debug('connected:', this.identifier)
  }

  // data-action="mouseover->showcase#show"
  show(event) {
    let ele = event.currentTarget
    ele.classList.add(this.hoverClass)
    for (const el of ele.parentElement.children) {
      if (el !== ele) {
        el.classList.remove(this.hoverClass)
      }
    }

    let target = this.windowTarget.querySelector(`[data-index="${ele.dataset.index}"`)
    target.style.zIndex = 1

    for (const el of this.windowTarget.children) {
      if (el.dataset.index !== ele.dataset.index) {
        el.style.zIndex = 0
      }
    }
  }

}
