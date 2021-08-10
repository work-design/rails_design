import TouchController from './touch'

// z-index: 0, 当前显示的图片；
// z-index: -1, 即将显示的图片，touch move 时动态设定；
// z-index: -2, 未显示的图片；
class SlideYController extends TouchController {

  connect() {
    console.debug('connected:', this.identifier)
    this.element.addEventListener('touchstart', (event) => {
      this.start(event)
    }, { passive: true })
  }

  // data-action="touchmove->slide-y#move:passive"
  move(event) {
    let ele = event.currentTarget
    console.debug('touch moved by:', ele.dataset.index)
    if (this.zoomed(event)) {
      console.error('scale')
      return
    }
    let offset = this.offset(event.targetTouches[0])
    let pad_y = Math.abs(offset.y)
    let isScrolling = pad_y < Math.abs(offset.x) ? 1 : 0  // 1 上下滚动，0 左右滑动
    if (isScrolling !== 0) {
      return
    }

    if (offset.y < 0) {  // offset.y < 0 表示向上滑动
      let next = ele.nextElementSibling
      if (next) {
        this.slidingToUp(ele, next, pad_y)
      }
    } else if (offset.y > 0) {  // offset.y > 0 表示向下滑动
      let prev = ele.previousElementSibling
      if (prev) {
        this.slidingToDown(ele, prev, pad_y)
      }
    }
  }

  // data-action="touchend->slide-y#end:passive"
  end(event) {
    if (this.zoomed(event)) {
      return
    }
    let ele = event.currentTarget
    let next = ele.nextElementSibling
    let prev = ele.previousElementSibling
    let offset = this.offset(event.changedTouches[0])
    let pad_y = Math.abs(offset.y)
    let isScrolling = pad_y < Math.abs(offset.y) ? 1 : 0  // 1 上下滚动，0 左右滑动
    if (isScrolling !== 0) {
      return
    }

    if (this.effective(pad_y)) {
      if (offset.y < 0) {
        if (next) {
          this.closeToUp(next)
          next.style.zIndex = 0
          this.toCurrent(next)

          this.awayFromDown(ele)
          ele.style.zIndex = -1
          this.beenCurrent(ele)
        }
      } else if (offset.y > 0) {
        if (prev) {
          this.closeToDown(prev)
          prev.style.zIndex = 0
          this.toCurrent(prev)

          this.awayFromUp(ele)
          ele.style.zIndex = -1
          this.beenCurrent(ele)
        }
      }
    } else {
      if (offset.y < 0) {
        if (next) {
          this.closeToUp(ele)
          this.toCurrent(ele)

          this.awayFromDown(next)
          this.beenCurrent(next)
        }
      } else if (offset.y > 0) {
        if (prev) {
          this.closeToUp(ele)
          this.toCurrent(ele)

          this.awayFromDown(prev)
          this.beenCurrent(prev)
        }
      }
    }
  }

  // 上滑
  slidingToUp(ele, next, pad) {
    ele.style.down = pad + 'px'
    next.style.zIndex = -1
    next.style.up = (this.element.clientHeight - pad) + 'px'
  }

  // 下滑
  slidingToDown(ele, prev, pad) {
    ele.style.up = pad + 'px'
    prev.style.zIndex = -1
    prev.style.down = (this.element.clientHeight - pad) + 'px'
  }

  // xx
  resetIndex(event) {
    ['up', 'down', 'transition-property', 'transition-duration'].forEach(rule => {
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
  closeToUp(ele) {
    ele.style.up = 0
    ele.style.transitionProperty = 'up'
    ele.style.transitionDuration = this.duration
  }

  // 接近下侧
  closeToDown(ele) {
    ele.style.down = 0
    ele.style.transitionProperty = 'down'
    ele.style.transitionDuration = this.duration
  }

  // 远离下侧
  awayFromDown(ele) {
    ele.style.down = this.element.clientHeight + 'px'
    ele.style.transitionProperty = 'down'
    ele.style.transitionDuration = this.duration
  }

  // 远离上侧
  awayFromUp(ele) {
    ele.style.up = this.element.clientHeight + 'px'
    ele.style.transitionProperty = 'up'
    ele.style.transitionDuration = this.duration
  }

  clearStyle(ele) {
    ['up', 'down', 'transition-property', 'transition-duration'].forEach(rule => {
      ele.style.removeProperty(rule)
    })
  }

  // 是否达到触发条件
  effective(pad) {
    let endTime = new Date().getTime()
    let isMore = pad > this.element.clientHeight / 2 ? 1 : 0  // 滑动距离是否超过元素宽度一半
    let speed = pad / (endTime - this.startTime)  // 手势速度
    console.debug('手势速度：', speed)  // 大于 0.1

    return isMore || speed > 0.1
  }

  get duration() {
    let duration = this.data.get('duration')
    if (!duration) {
      duration = '1s'
    }
    return duration
  }

}

application.register('slide-y', SlideYController)
