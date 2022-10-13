import TouchController from './touch'

// z-index: 0, 当前显示的图片/即将显示的图片，touch move 时动态设定；
// z-index: -1, 未显示的图片；
// left 的优先级高于 right
export default class extends TouchController {
  static values = {
    delay: { type: Number, default: 0 }, // 延迟时间，单位为秒
    circle: Boolean, // 是否循环播放，true 为循环播放
  }
  static targets = ['container', 'dot']

  connect() {
    this.element.addEventListener('touchstart', event => {
      this.start(event)
    }, { passive: true })

    if (this.hasDelayValue && this.delayValue > 0) {
      this.mode()
    }
  }

  mode(ele = this.containerTarget.firstElementChild) {
    this.timer = setTimeout(() => {
      this.shiftLeft(ele)
      clearTimeout(this.timer)
      const next = this.next(ele)
      this.mode(next)
    }, this.delayValue * 1000, ele)
  }

  start(event) {
    this.initStatus(event)
    window.xxx = event.target
    // 对于自动轮播中的图片，当有 touch 动作时，暂停自动轮播
    if (this.timer) {
      clearTimeout(this.timer)
    }

    const ele = event.target.closest('[data-index]')
    ele.removeEventListener('transitioncancel', this.beenCurrentAfter)
    ele.removeEventListener('transitionend', this.beenCurrentAfter)
  }

  // data-action="touchmove->slide#move:passive"
  move(event) {
    const ele = event.currentTarget
    console.debug('touch moved by element:', ele.dataset.index)
    if (this.zoomed(event)) {
      return
    }
    const offset = this.offset(event)
    const pad = Math.abs(offset.x)
    if (!this.isHorizontal(pad, offset)) {
      return
    }

    if (offset.x < 0) {  // offset.x < 0 表示向左滑动
      this.goingLeft(ele, pad)
    } else if (offset.x > 0) {  // offset.x > 0 表示向右滑动
      this.goingRight(ele, pad)
    }
  }

  // data-action="touchend->slide#end:passive"
  end(event) {
    if (this.zoomed(event)) {
      return
    }
    const ele = event.currentTarget
    const offset = this.offset(event)
    const pad = Math.abs(offset.x)

    if (!this.isHorizontal(pad, offset)) {
      console.debug('not scrolling')
      this.rollback(offset, ele)
    }

    if (this.effective(pad)) {
      this.going(offset, ele)
    } else {
      this.rollback(offset, ele)
    }
  }

  // 执行翻页
  going(offset, ele) {
    if (offset.x < 0) {
      this.shiftLeft(ele)
    }
    if (offset.x > 0) {
      this.shiftRight(ele)
    }
  }

  // 回退到之前的状态
  rollback(offset, ele) {
    const next = ele.nextElementSibling
    if (offset.x < 0 && next) {
      this.shiftRight(next)
    }

    const prev = ele.previousElementSibling
    if (offset.x > 0 && prev) {
      this.shiftLeft(prev)
    }
  }

  // ele 向左滑出，滑出距离为 pad
  goingLeft(ele, pad) {
    const next = this.next(ele)
    if (next) {
      ele.style.left = -pad + 'px'
      next.style.zIndex = 0
      next.style.left = (this.element.clientWidth - pad) + 'px'
    }
  }

  // ele 向右滑出，滑出距离为 pad
  goingRight(ele, pad) {
    const prev = ele.previousElementSibling
    if (prev) {
      ele.style.left = pad + 'px'
      prev.style.zIndex = 0
      prev.style.left = (pad - this.element.clientWidth) + 'px'
    }
  }

  // ele 向左滑出
  shiftLeft(ele) {
    const next = this.next(ele)
    if (next) {
      ele.classList.add('transition')
      next.classList.add('transition')
      this.toCurrent(next)
      this.beenCurrent(ele)
    }
  }

  // ele 向右滑出
  shiftRight(ele) {
    const prev = ele.previousElementSibling
    if (prev) {
      //ele.style.zIndex = 0
      this.beenCurrent(ele, this.element.clientWidth + 'px')

      //prev.style.left = 0
      //prev.style.zIndex = 0
      this.toCurrent(prev)
    }
  }

  // 不再展示
  beenCurrent(ele, left = -this.element.clientWidth + 'px') {
    console.debug('add transition event beenCurrentAfter for been', ele.dataset.index)
    ele.style.left = left
    ele.addEventListener('transitionend', this.beenCurrentAfter, { once: true })
    ele.addEventListener('transitioncancel', this.beenCurrentAfter, { once: true })
  }

  // this become event.target
  beenCurrentAfter(event) {
    const ele = event.currentTarget
    ele.style.zIndex = -1

    console.debug(ele.dataset.index, 'reset index by', event.type)

    const controller = ele.closest('[data-controller~=slide]').controller('slide')
    if (!controller) {
      return
    }
    controller.resetStyle(ele)
    controller.darken(ele)

    if (event.type === 'transitionend') {
      ele.removeEventListener('transitioncancel', controller.beenCurrentAfter)
    } else if (event.type === 'transitioncancel') {
      ele.removeEventListener('transitionend', controller.beenCurrentAfter)
    }
  }

  // 即将展示
  toCurrent(ele) {
    ele.style.zIndex = 0
    ele.style.left = 0
    console.debug('add transition event toCurrentAfter for to', ele.dataset.index)
    ele.addEventListener('transitionend', this.toCurrentAfter, { once: true })
    ele.addEventListener('transitioncancel', this.toCurrentAfter, { once: true })
  }

  toCurrentAfter(event) {
    const ele = event.currentTarget
    console.debug(ele.dataset.index, 'to Current after', event.type)

    const controller = ele.closest('[data-controller~=slide]').controller('slide')
    if (!controller) {
      return
    }
    controller.lighten(ele)
    controller.resetStyle(ele)

    const next = controller.next(ele)
    if (ele.classList.contains('transition_later') && next) {
      next.style.left = next.clientWidth + 'px'
      controller.shiftLeft(ele, true)
    }

    if (event.type === 'transitionend') {
      ele.removeEventListener('transitioncancel', controller.toCurrentAfter)
    } else if (event.type === 'transitioncancel') {
      ele.removeEventListener('transitionend', controller.toCurrentAfter)
    }
  }

  resetStyle(ele) {
    // 结束轮播之后，将 left 重置，最终 style 只保留 index
    ele.style.removeProperty('left')
  }

  next(ele) {
    if (this.hasCircleValue && this.circleValue) {
      return ele.nextElementSibling || this.containerTarget.firstElementChild
    } else {
      return ele.nextElementSibling
    }
  }

  darken(ele) {
    if (this.hasDotTarget) {
      const dot = this.dotTarget.children[ele.dataset.index]
      dot.classList.replace('has-text-white', 'has-text-black')
    }
  }

  lighten(ele) {
    if (this.hasDotTarget) {
      const dot = this.dotTarget.children[ele.dataset.index]
      dot.classList.replace('has-text-black', 'has-text-white')
    }
  }

  disconnect() {
  }

}
