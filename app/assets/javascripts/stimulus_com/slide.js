import TouchController from './touch'

// z-index: 1, 当前显示的图片；
// z-index: 0, 即将显示的图片，touch move 时动态设定；
// z-index: -1, 未显示的图片；
// left 的优先级高于 right
export default class extends TouchController {
  static values = {
    play: Boolean
  }

  connect() {
    this.element.addEventListener('touchstart', event => {
      this.start(event)
    }, { passive: true })

    if (this.hasPlayValue && this.playValue) {
      let ele = this.element.firstElementChild
      let next = ele.nextElementSibling || this.element.firstElementChild
      this.initStyle(ele, next)
      this.playToLeft(ele, next)
    }
  }

  initStyle(ele, next) {
    //next.style.zIndex = 0
    next.style.left = next.clientWidth + 'px'
    this.transitionLater(ele, next)
  }

  start(event) {
    this.initStatus(event)

    const ele = event.target.closest('[data-index]')
    let next = ele.nextElementSibling || this.element.firstElementChild
    this.initStyle(ele, next)
    this.transitionNone(ele, next)
    ele.removeEventListener('transitioncancel', this.resetIndex)
    ele.removeEventListener('transitionend', this.resetIndex)
  }

  // data-action="touchmove->slide#move:passive"
  move(event) {
    const ele = event.currentTarget
    console.debug('touch moved by:', ele.dataset.index)
    if (this.zoomed(event)) {
      console.error('scale')
      return
    }
    const offset = this.offset(event)
    const pad = Math.abs(offset.x)
    if (!this.isHorizontal(pad, offset)) {
      return
    }

    if (offset.x < 0) {  // offset.x < 0 表示向左滑动
      const next = ele.nextElementSibling
      if (next) {
        ele.style.left = -pad + 'px'
        next.style.zIndex = 0
        next.style.left = (this.element.clientWidth - pad) + 'px'
      }
    } else if (offset.x > 0) {  // offset.x > 0 表示向右滑动
      const prev = ele.previousElementSibling
      if (prev) {
        ele.style.left = pad + 'px'
        prev.style.zIndex = 0
        prev.style.left = (pad - this.element.clientWidth) + 'px'
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
    const next = ele.nextElementSibling
    const prev = ele.previousElementSibling
    this.transitionNow(ele)

    if (offset.x < 0 && next) {
      this.transitionNow(next)
      this.playToLeft(ele, next)
    }

    if (offset.x > 0 && prev) {
      this.transitionNow(prev)
      this.playToRight(ele, prev)
    }
  }

  // ele 向左滑出
  playToLeft(ele, next) {
    ele.style.left = -this.element.clientWidth + 'px'
    this.beenCurrent(ele)

    next.style.left = 0
    next.style.zIndex = 0
    this.toCurrent(next)
  }

  // ele 向右滑出
  playToRight(ele, prev) {
    prev.style.left = 0
    prev.style.zIndex = 1
    this.toCurrent(prev)

    ele.style.left = this.element.clientWidth + 'px'
    ele.style.zIndex = 0
    this.beenCurrent(ele)
  }

  // 回退到之前的状态
  rollback(offset, ele) {
    const next = ele.nextElementSibling
    const prev = ele.previousElementSibling

    //this.removeStyle(ele, ['left'])

    if (offset.x < 0 && next) {
      this.transitionNow(ele)
      this.playToLeft(next, ele)
    }

    if (offset.x > 0 && prev) {
      this.transitionNow(ele)
      this.playToRight(prev, ele)
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
    console.debug('add transition event listener for been', ele.dataset.index)
    ele.addEventListener('transitionend', this.resetIndex, { once: true })
    ele.addEventListener('transitioncancel', this.resetIndex, { once: true })
  }

  // 即将展示
  toCurrent(ele) {
    console.debug('add transition event listener for to', ele.dataset.index)
    ele.addEventListener('transitionend', this.clearStyle, { once: true })
    ele.addEventListener('transitioncancel', this.clearStyle, { once: true })
  }

  clearStyle(event) {
    ['left', 'right', 'transition-duration'].forEach(rule => {
      event.currentTarget.style.removeProperty(rule)
    })
    event.currentTarget.classList.remove('transition_now')
    console.debug(event.target.dataset.index, 'clear style by', event.type)

    const controller = event.target.parentElement.controller('slide')
    if (event.type === 'transitionend') {
      event.target.removeEventListener('transitioncancel', controller.clearStyle)
    } else if (event.type === 'transitioncancel') {
      event.target.removeEventListener('transitionend', controller.clearStyle)
    }
  }

  // this become event.target
  resetIndex(event) {
    ['left', 'right', 'transition-duration'].forEach(rule => {
      event.currentTarget.style.removeProperty(rule)
    })
    event.currentTarget.classList.remove('transition_now')
    event.currentTarget.style.zIndex = -1
    console.debug(event.target.dataset.index, 'reset index by', event.type)

    const controller = event.target.parentElement.controller('slide')
    if (event.type === 'transitionend') {
      event.target.removeEventListener('transitioncancel', controller.resetIndex)
    } else if (event.type === 'transitioncancel') {
      event.target.removeEventListener('transitionend', controller.resetIndex)
    }
  }

}
