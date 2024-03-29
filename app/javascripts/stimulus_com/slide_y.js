import SlideController from './slide'

// z-index: 0, 当前显示的图片；
// z-index: -1, 即将显示的图片，touch move 时动态设定；
// z-index: -2, 未显示的图片；
export default class extends SlideController {

  connect() {
    super.connect()
  }

  // data-action="touchmove->slide-y#move:passive"
  move(event) {
    const ele = event.currentTarget
    console.debug('touch moved by:', ele.dataset.index)
    if (this.zoomed(event)) {
      console.error('scale')
      return
    }
    let offset = this.offset(event)
    let pad_y = Math.abs(offset.y)
    let isScrolling = pad_y > Math.abs(offset.x) ? 1 : 0  // 1 上下滚动，0 左右滑动
    if (isScrolling === 0) {
      return
    }

    if (offset.y < 0) {  // offset.y < 0 表示向上滑动
      let next = ele.nextElementSibling
      if (next) {
        this.slidingToTop(ele, next, pad_y)
      }
    } else if (offset.y > 0) {  // offset.y > 0 表示向下滑动
      let prev = ele.previousElementSibling
      if (prev) {
        this.slidingToBottom(ele, prev, pad_y)
      }
    }
  }

  // data-action="touchend->slide-y#end:passive"
  end(event) {
    if (this.zoomed(event)) {
      return
    }
    let ele = event.currentTarget

    let offset = this.offset(event)
    let pad_y = Math.abs(offset.y)
    let isScrolling = pad_y > Math.abs(offset.x) ? 1 : 0  // 1 上下滑动，0 左右滑动
    if (isScrolling === 0) {
      console.debug('not scrolling')
      this.rollback(offset, ele)
    }

    if (this.effective(pad_y, false)) {
      this.going(offset, ele)
    } else {
      this.rollback(offset, ele)
    }
  }

  // 执行翻页
  going(offset, ele) {
    const next = ele.nextElementSibling
    const prev = ele.previousElementSibling

    if (offset.y < 0 && next) {
      this.closeToTop(next)
      next.style.zIndex = 0
      this.toCurrent(next)

      this.awayFromBottom(ele)
      ele.style.zIndex = -1
      this.beenCurrent(ele)
    }

    if (offset.y > 0 && prev) {
      this.closeToBottom(prev)
      prev.style.zIndex = 0
      this.toCurrent(prev)

      this.awayFromTop(ele)
      ele.style.zIndex = -1
      this.beenCurrent(ele)
    }
  }

  // 回退到之前的状态
  rollback(offset, ele) {
    const next = ele.nextElementSibling
    const prev = ele.previousElementSibling

    if (offset.y < 0 && next) {
      this.closeToBottom(ele)
      this.toCurrent(ele)

      this.awayFromTop(next)
      this.beenCurrent(next)
    }

    if (offset.y > 0 && prev) {
      this.closeToTop(ele)
      this.toCurrent(ele)

      this.awayFromBottom(prev)
      this.beenCurrent(prev)
    }
  }

  // 上滑
  slidingToTop(ele, next, pad) {
    ele.style.bottom = pad + 'px'
    next.style.zIndex = -1
    next.style.top = (this.element.clientHeight - pad) + 'px'
  }

  // 下滑
  slidingToBottom(ele, prev, pad) {
    ele.style.top = pad + 'px'
    prev.style.zIndex = -1
    prev.style.bottom = (this.element.clientHeight - pad) + 'px'
  }

  // xx
  resetIndex(event) {
    ['top', 'bottom', 'transition-property', 'transition-duration'].forEach(rule => {
      event.currentTarget.style.removeProperty(rule)
    })
    event.currentTarget.style.zIndex = -2
  }

  // 不再展示
  beenCurrent(ele) {
    console.debug('add transition event listener for been', ele.dataset.index)
    ele.addEventListener('transitionend', this.resetIndex, { once: true })
    ele.addEventListener('transitioncancel', (event) => {
      this.resetIndex(event)
      ele.removeEventListener('transitionend', this.resetIndex)
    }, { once: true })
  }

  // 即将展示
  toCurrent(ele) {
    console.debug('add transition event listener for to', ele.dataset.index)
    ele.addEventListener('transitionend', (event) => {
      this.clearStyle(event.currentTarget)
    }, { once: true })
    ele.addEventListener('transitioncancel', (event) => {
      this.clearStyle(event.currentTarget)
    }, { once: true })
  }

  // 接近上侧
  closeToTop(ele) {
    ele.style.top = 0
    ele.style.transitionProperty = 'top'
    ele.style.transitionDuration = this.duration
  }

  // 接近下侧
  closeToBottom(ele) {
    ele.style.bottom = 0
    ele.style.transitionProperty = 'bottom'
    ele.style.transitionDuration = this.duration
  }

  // 远离下侧
  awayFromBottom(ele) {
    ele.style.bottom = this.element.clientHeight + 'px'
    ele.style.transitionProperty = 'bottom'
    ele.style.transitionDuration = this.duration
  }

  // 远离上侧
  awayFromTop(ele) {
    ele.style.top = this.element.clientHeight + 'px'
    ele.style.transitionProperty = 'top'
    ele.style.transitionDuration = this.duration
  }

  clearStyle(ele) {
    ['top', 'bottom', 'transition-property', 'transition-duration'].forEach(rule => {
      ele.style.removeProperty(rule)
    })
  }

}
