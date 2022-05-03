import TouchController from './touch'

// z-index: 1, 当前显示的图片；
// z-index: 0, 即将显示的图片，touch move 时动态设定；
// z-index: -1, 未显示的图片；
// left 的优先级高于 right
export default class extends TouchController {
  static values = {
    play: Boolean, // 是否自动播放，true 为自动轮播
    circle: Boolean, // 是否循环播放，true 为循环播放
  }
  static targets = ['container']

  connect() {
    this.element.addEventListener('touchstart', event => {
      this.start(event)
    }, { passive: true })

    if (this.hasPlayValue && this.playValue) {
      let ele = this.containerTarget.firstElementChild
      this.goLeft(ele, true)
    }
  }

  start(event) {
    this.initStatus(event)
    const ele = event.target.closest('[data-index]')
    const next = this.next(ele)
    this.transitionNone(ele, next)

    ele.removeEventListener('transitioncancel', this.resetIndex)
    ele.removeEventListener('transitionend', this.resetIndex)
  }

  // data-action="touchmove->slide#move:passive"
  move(event) {
    const ele = event.currentTarget
    console.debug('touch moved by:', ele.dataset.index)
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
      this.goLeft(ele)
    }
    if (offset.x > 0) {
      this.goRight(ele)
    }
  }

  // 回退到之前的状态
  rollback(offset, ele) {
    const next = ele.nextElementSibling
    if (offset.x < 0 && next) {
      this.goRight(next)
    }

    const prev = ele.previousElementSibling
    if (offset.x > 0 && prev) {
      this.goLeft(prev)
    }
  }

  // ele 向左滑出，滑出距离为 pad
  goingLeft(ele, pad) {
    const next = ele.nextElementSibling
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
  goLeft(ele, later = false) {
    const next = this.next(ele)
    if (next) {
      next.style.left = next.clientWidth + 'px'

      if (later) {
        this.transitionLater(ele, next)
      } else {
        this.transitionNow(ele, next)
      }

      ele.style.left = -this.element.clientWidth + 'px'
      this.beenCurrent(ele)

      next.style.left = 0
      next.style.zIndex = 0
      this.toCurrent(next)
    }
  }

  // ele 向右滑出
  goRight(ele) {
    const prev = ele.previousElementSibling
    if (prev) {
      this.transitionNow(ele, prev)

      ele.style.left = this.element.clientWidth + 'px'
      ele.style.zIndex = 0
      this.beenCurrent(ele)

      prev.style.left = 0
      prev.style.zIndex = 1
      this.toCurrent(prev)
    }
  }

  transitionLater(...elements) {
    elements.forEach(ele => {
      if (!ele.classList.contains('transition_later')) {
        ele.classList.add('transition_later')
      }
    })
  }

  //
  transitionNone(...elements) {
    elements.forEach(ele => {
      if (ele.classList.contains('transition_later')) {
        ele.classList.remove('transition_later')
      }
    })
  }

  transitionNow(...elements) {
    elements.forEach(ele => {
      if (ele.classList.contains('transition_later')) {
        ele.classList.replace('transition_later', 'transition_now')
      } else if (!ele.classList.contains('transition_now')) {
        ele.classList.add('transition_now')
      }
    })
  }

  // 不再展示
  beenCurrent(ele) {
    console.debug('add transition event resetIndex for been', ele.dataset.index)
    ele.addEventListener('transitionend', this.resetIndex, { once: true })
    ele.addEventListener('transitioncancel', this.resetIndex, { once: true })
  }

  // 即将展示
  toCurrent(ele) {
    console.debug('add transition event clearStyle for to', ele.dataset.index)
    ele.addEventListener('transitionend', this.clearStyle, { once: true })
    ele.addEventListener('transitioncancel', this.clearStyle, { once: true })
  }

  clearStyle(event) {
    const ele = event.currentTarget
    const controller = ele.parentElement.controller('slide')
    if (ele.classList.contains('transition_later')) {
      const next = ele.nextElementSibling || ele.parentElement.firstElementChild
      next.style.left = next.clientWidth + 'px'
      controller.goLeft(ele, true)
    }

    //ele.classList.remove('transition_now', 'transition_later')
    console.debug(ele.dataset.index, 'clear style by', event.type)

    if (event.type === 'transitionend') {
      ele.removeEventListener('transitioncancel', controller.clearStyle)
    } else if (event.type === 'transitioncancel') {
      ele.removeEventListener('transitionend', controller.clearStyle)
    }
  }

  // this become event.target
  resetIndex(event) {
    const ele = event.currentTarget
    ele.classList.remove('transition_now', 'transition_later')
    ele.style.zIndex = -1
    console.debug(ele.dataset.index, 'reset index by', event.type)

    const controller = ele.parentElement.controller('slide')
    if (event.type === 'transitionend') {
      ele.removeEventListener('transitioncancel', controller.resetIndex)
    } else if (event.type === 'transitioncancel') {
      ele.removeEventListener('transitionend', controller.resetIndex)
    }
  }

  next(ele) {
    if (this.hasCircleValue && this.playValue) {
      return ele.nextElementSibling || this.containerTarget.firstElementChild
    } else {
      return ele.nextElementSibling
    }
  }

  disconnect() {

  }

}
