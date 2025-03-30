import { Controller } from '@hotwired/stimulus'

// 商品橱窗展示，
// 点击小图显示对应图片
// 点击切换箭头，显示上一张或者下一张图片
export default class extends Controller {
  static targets = [
    'window', 'preview', 'image'
  ]
  static classes = [
    'hover'
  ]

  // data-action="mouseover->showcase#show"
  show(event) {
    const ele = event.currentTarget
    ele.classList.add(this.hoverClass)
    for (const el of ele.parentElement.children) {
      if (el !== ele) {
        el.classList.remove(this.hoverClass)
      }
    }

    const target = this.windowTarget.querySelector(`[data-index="${ele.dataset.index}"`)
    target.style.zIndex = 1

    for (const el of this.windowTarget.children) {
      if (el.dataset.index !== ele.dataset.index) {
        el.style.zIndex = 0
      }
    }
  }

  preview(e) {
    if (this.hasPreviewTarget) {
      this.previewTarget.parentNode.parentNode.classList.add('is-active')
      this.previewTarget.src = e.currentTarget.children[0].src
    }
  }

}
