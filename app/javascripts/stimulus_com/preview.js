import { Controller } from '@hotwired/stimulus'

// 商品橱窗展示，
// 点击小图显示对应图片
// 点击切换箭头，显示上一张或者下一张图片
export default class extends Controller {
  static targets = [
    'window', 'preview', 'image', 'position', 'title'
  ]
  static values = {
    hover: { type: String, default: 'is-border' }
  }

  // data-action="click->preview#show"
  show(event) {
    const ele = event.currentTarget
    if (this.hasPreviewTarget) {
      this.modal.classList.add('is-active', 'clipped')
      document.documentElement.classList.add('clipped')
    }

    const target = this.windowTarget.querySelector(`[data-index="${ele.dataset.index}"`)
    this.showTarget(target)
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
    if (this.hasPositionTarget) {
      this.positionTarget.innerText = parseInt(ele.dataset.index) + 1
    }

    for (const el of ele.parentElement.children) {
      if (el !== ele) {
        el.classList.remove(this.hoverValue)
      }
    }

    this.previewTarget.src = ele.children[0].src
    if (this.hasTitleTarget) {
      this.titleTarget.innerText = ele.dataset.title
    }
  }

  hide() {
    this.modal.classList.remove('is-active')
    document.documentElement.classList.remove('clipped')
    for (const el of this.windowTarget.children) {
      el.classList.remove(this.hoverValue)
    }
  }

  get modal() {
    return this.previewTarget.parentNode.parentNode
  }

}
