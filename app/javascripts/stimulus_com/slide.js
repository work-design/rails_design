import TouchController from './touch'

// z-index: 0, 当前显示的图片/即将显示的图片，touch move 时动态设定；
// z-index: -1, 未显示的图片；
// left 的优先级高于 right
// transition 动画应在 touch end 的时候添加
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

    const ele = this.containerTarget.firstElementChild
    ele.classList.add('is-active')
    if (this.hasDelayValue && this.delayValue > 0) {
      this.mode(ele)
    }
  }

  mode(ele) {
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

    console.log('xxx', this.direction)

    const ele = event.target.closest('[data-index]')
    ele.style.left = ele.getBoundingClientRect().x + 'px'
    ele.classList.remove('transition')
    const next = this.next(ele)
    if (next) {
      next.style.left = next.getBoundingClientRect().x + 'px'
      next.classList.remove('transition')
    }

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

    // offset.x < 0 表示向左滑动，反之 offset.x > 0 表示向右滑动
    if (offset.x < 0) {
      const next = this.next(ele)
      if (next) {
        ele.style.left = -pad + 'px'
        next.classList.add('is-active')
        next.style.left = (this.containerTarget.clientWidth - pad) + 'px'
      }
    } else if (offset.x > 0) {
      const prev = this.prev(ele)
      if (prev) {
        ele.style.left = pad + 'px'
        prev.classList.add('is-active')
        prev.style.left = (pad - this.containerTarget.clientWidth) + 'px'
      }
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
      console.debug('not scrolling', offset)
      this.rollback(offset, ele)
    }

    if (this.effective(pad)) {
      this.going(offset, ele)
    } else if (this.direction === 'left') {
      this.shiftLeft(ele)
    } else if (this.direction === 'right') {
      this.shiftRight(ele)
    } else {
      this.rollback(offset, ele)
    }
  }

  // 执行翻页
  going(offset, ele) {
    if (offset.x < 0) {
      this.direction = 'left'
      this.shiftLeft(ele)
    }
    if (offset.x > 0) {
      this.direction = 'right'
      this.shiftRight(ele)
    }
  }

  // 回退到之前的状态
  rollback(offset, ele) {
    const next = this.next(ele)

    if (offset.x < 0 && next) {
      this.shiftRight(next)
    }

    const prev = this.prev(ele)
    if (offset.x > 0 && prev) {
      this.shiftLeft(prev)
    }
  }

  // ele 向左滑出
  shiftLeft(ele) {
    const next = this.next(ele)
    if (next) {
      ele.classList.add('transition')
      this.beenCurrent(ele)

      next.classList.add('transition')
      this.toCurrent(next)
    }
  }

  // ele 向右滑出
  shiftRight(ele) {
    const prev = this.prev(ele)
    if (prev) {
      ele.classList.add('transition')
      this.beenCurrent(ele, this.element.clientWidth + 'px')

      prev.classList.add('transition')
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
    ele.classList.remove('is-active')
    console.debug(ele.dataset.index, 'reset index by', event.type)

    const controller = ele.closest('[data-controller~=slide]').controller('slide')
    if (!controller) {
      return
    }
    controller.darken(ele)

    if (event.type === 'transitionend') {
      ele.style.removeProperty('left')
      ele.classList.remove('transition')
      ele.removeEventListener('transitioncancel', controller.beenCurrentAfter)
    } else if (event.type === 'transitioncancel') {
      ele.removeEventListener('transitionend', controller.beenCurrentAfter)
    }
  }

  // 即将展示
  toCurrent(ele) {
    ele.classList.add('is-active')
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

    if (event.type === 'transitionend') {
      ele.style.removeProperty('left')
      ele.classList.remove('transition')
      ele.removeEventListener('transitioncancel', controller.toCurrentAfter)
    } else if (event.type === 'transitioncancel') {
      ele.removeEventListener('transitionend', controller.toCurrentAfter)
    }
  }

  next(ele) {
    if (this.hasCircleValue && this.circleValue) {
      return ele.nextElementSibling || this.containerTarget.firstElementChild
    } else {
      return ele.nextElementSibling
    }
  }

  prev(ele) {
    if (this.hasCircleValue && this.circleValue) {
      return ele.previousElementSibling || this.containerTarget.lastElementChild
    } else {
      return ele.previousElementSibling
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
