import TouchController from './touch'

// z-index: 1, 当前显示的图片；
// z-index: 0, 即将显示的图片，touch move 时动态设定；
// z-index: -1, 未显示的图片；
export default class extends TouchController {
  static values = {
    play: Boolean
  }

  connect() {
    this.element.addEventListener('touchstart', event => {
      this.start(event)
    }, { passive: true })

    if (this.hasPlayValue && this.playValue) {
      console.log('-------->')
      let first = this.element.firstElementChild
      this.autoPlay(first)
    }
  }

  autoPlay(ele) {
    let next = ele.nextElementSibling || this.element.firstElementChild

    ele.style.transitionDelay = '3s'
    next.style.transitionDelay = '3s'
    this.playToLeft(ele, next)

    autoPlay(next)
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
    const isScrolling = pad > Math.abs(offset.y) ? 1 : 0  // 1 左右滑动，0 上下滑动
    if (isScrolling === 0) {
      return
    }

    if (offset.x < 0) {  // offset.x < 0 表示向左滑动
      const next = ele.nextElementSibling
      if (next) {
        this.slidingToLeft(ele, next, pad)
      }
    } else if (offset.x > 0) {  // offset.x > 0 表示向右滑动
      const prev = ele.previousElementSibling
      if (prev) {
        this.slidingToRight(ele, prev, pad)
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
    const isScrolling = pad > Math.abs(offset.y) ? 1 : 0  // 1 左右滑动，0 上下滑动
    if (isScrolling === 0) {
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

    if (offset.x < 0 && next) {
      this.playToLeft(ele, next)
    }

    if (offset.x > 0 && prev) {
      this.closeToRight(prev)
      prev.style.zIndex = 1
      this.toCurrent(prev)

      this.awayFromLeft(ele)
      ele.style.zIndex = 0
      this.beenCurrent(ele)
    }
  }

  playToLeft(ele, next) {
    this.closeToLeft(next)
    next.style.zIndex = 1
    this.toCurrent(next)

    this.awayFromRight(ele)
    ele.style.zIndex = 0
    this.beenCurrent(ele)
  }

  // 回退到之前的状态
  rollback(offset, ele) {
    const next = ele.nextElementSibling
    const prev = ele.previousElementSibling

    if (offset.x < 0 && next) {
      this.closeToRight(ele)
      this.toCurrent(ele)

      this.awayFromLeft(next)
      this.beenCurrent(next)
    }

    if (offset.x > 0 && prev) {
      this.closeToLeft(ele)
      this.toCurrent(ele)

      this.awayFromRight(prev)
      this.beenCurrent(prev)
    }
  }

  // 左滑
  slidingToLeft(ele, next, pad) {
    ele.style.right = pad + 'px'
    ele.style.marginLeft = -pad + 'px'
    next.style.zIndex = 0
    next.style.left = (this.element.clientWidth - pad) + 'px'
    //next.style.marginLeft = (this.element.clientWidth - pad) + 'px'
    //next.style.marginRight = (pad - this.element.clientWidth) + 'px'
  }

  // 右滑
  slidingToRight(ele, prev, pad) {
    ele.style.left = pad + 'px'
    prev.style.zIndex = 0
    prev.style.right = (this.element.clientWidth - pad) + 'px'
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

  // 接近左侧
  closeToLeft(ele) {
    ele.style.left = 0
    ele.style.transitionProperty = 'left'
    ele.style.transitionDuration = this.duration
  }

  // 接近右侧
  closeToRight(ele) {
    ele.style.right = 0
    ele.style.transitionProperty = 'right'
    ele.style.transitionDuration = this.duration
  }

  // 远离右侧
  awayFromRight(ele) {
    ele.style.right = this.element.clientWidth + 'px'
    ele.style.transitionProperty = 'right'
    ele.style.transitionDuration = this.duration
  }

  // 远离左侧
  awayFromLeft(ele) {
    ele.style.left = this.element.clientWidth + 'px'
    ele.style.transitionProperty = 'left'
    ele.style.transitionDuration = this.duration
  }

  clearStyle(event) {
    ['left', 'right', 'margin-left', 'transition-property', 'transition-duration'].forEach(rule => {
      event.currentTarget.style.removeProperty(rule)
    })
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
    ['left', 'right', 'margin-left', 'transition-property', 'transition-duration'].forEach(rule => {
      event.currentTarget.style.removeProperty(rule)
    })
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
