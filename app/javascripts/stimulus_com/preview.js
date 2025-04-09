import { Controller } from '@hotwired/stimulus'

// 商品橱窗展示，
// 点击小图显示对应图片
// 点击切换箭头，显示上一张或者下一张图片
export default class extends Controller {
  static targets = [
    'window', 'preview', 'image'
  ]
  static values = {
    hover: { type: String, default: 'is-border' }
  }

  // data-action="click->preview#show"
  show(event) {
    if (this.hasPreviewTarget) {
      this.previewTarget.parentNode.parentNode.classList.add('is-active')
      this.previewTarget.src = event.currentTarget.children[0].src
    }
  }

  current(event) {
    const ele = event.currentTarget
    this.showTarget(ele)
  }

  next() {
    const target = this.windowTarget.querySelector(`.${this.hoverValue}`)

    if (target.nextElementSibling) {
      this.showTarget(target.nextElementSibling)
    } else {
      this.showTarget(target.parentNode.firstElementChild)
    }
  }

  prev() {
    const target = this.windowTarget.querySelector(`.${this.hoverValue}`)

    if (target.previousElementSibling) {
      this.showTarget(target.previousElementSibling)
    } else {
      this.showTarget(target.parentNode.lastElementChild)
    }
  }

  showTarget(ele) {
    ele.classList.add(this.hoverValue)
    for (const el of ele.parentElement.children) {
      if (el !== ele) {
        el.classList.remove(this.hoverValue)
      }
    }

    this.previewTarget.src = ele.children[0].src
  }


}
