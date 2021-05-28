import TouchController from './touch'

// z-index: 0, 当前显示的图片；
// z-index: -1, 即将显示的图片，touch move 时动态设定；
// z-index: -2, 未显示的图片；
class SlideController extends TouchController {

  connect() {
    console.debug(this.identifier, 'connected!')
    this.element.addEventListener('touchstart', (event) => {
      this.start(event)
    }, { passive: true })
  }

  // data-action="touchmove->slide#move:passive"
  move(event) {
    let ele = event.currentTarget
    console.debug('move start', ele.dataset.index)
    if (this.zoomed(event)) {
      console.error('scale')
      return
    }
    let offset = this.offset(event.targetTouches[0])
    let pad = Math.abs(offset.x)
    let isScrolling = pad < Math.abs(offset.y) ? 1 : 0  // 1 上下滚动，0 左右滑动
    if (isScrolling !== 0) {
      return
    }

    if (offset.x < 0) {  // offset.x < 0 表示向左滑动
      let next = ele.nextElementSibling
      if (next) {
        ele.style.right = pad + 'px'
        next.style.zIndex = -1
        next.style.left = (this.element.clientWidth - pad) + 'px'
      }
    } else if (offset.x > 0) {  // offset.x > 0 表示向右滑动
      let prev = ele.previousElementSibling
      if (prev) {
        ele.style.left = pad + 'px'
        prev.style.zIndex = -1
        prev.style.right = (this.element.clientWidth - pad) + 'px'
      }
    }
  }

  // data-action="touchend->slide#end:passive"
  end(event) {
    if (this.zoomed(event)) {
      return
    }
    let ele = event.currentTarget
    let next = ele.nextElementSibling
    let prev = ele.previousElementSibling
    let endTime = new Date().getTime()
    let offset = this.offset(event.changedTouches[0])
    let pad = Math.abs(offset.x)
    let isScrolling = pad < Math.abs(offset.y) ? 1 : 0  // 1 上下滚动，0 左右滑动
    if (isScrolling !== 0) {
      return
    }

    let isMore = pad > this.element.clientWidth / 2 ? 1 : 0  // 滑动距离是否超过元素宽度一半
    let speed = pad / (endTime - this.startTime)  // 手势速度
    console.debug('手势速度', speed)  // 大于 0.1

    if (isMore || speed > 0.1) {
      if (offset.x < 0) {
        if (next) {
          this.closeToLeft(next)
          next.style.zIndex = 0
          this.toCurrent(next)

          this.awayFromRight(ele)
          ele.style.zIndex = -1
          this.beenCurrent(ele)
        }
      } else if (offset.x > 0) {
        if (prev) {
          this.closeToRight(prev)
          prev.style.zIndex = 0
          this.toCurrent(prev)

          this.awayFromLeft(ele)
          ele.style.zIndex = -1
          this.beenCurrent(ele)
        }
      }
    } else if (isMore === 0) {
      if (offset.x < 0) {
        if (next) {
          this.closeToRight(ele)
          this.toCurrent(ele)

          this.awayFromLeft(next)
          this.beenCurrent(next)
        }
      } else if (offset.x > 0) {
        if (prev) {
          this.closeToLeft(ele)
          this.toCurrent(ele)

          this.awayFromRight(prev)
          this.beenCurrent(prev)
        }
      }
    }
  }

  // 不再展示
  beenCurrent(ele) {
    ele.addEventListener('transitionend', (event) => {
      this.clearStyle(event.currentTarget)
      event.currentTarget.style.zIndex = -2
    }, { once: true })
    ele.addEventListener('transitioncancel', (event) => {
      this.clearStyle(event.currentTarget)
      event.currentTarget.style.zIndex = -2
    }, { once: true })
  }

  // 即将展示
  toCurrent(ele) {
    ele.addEventListener('transitionend', (event) => {
      this.clearStyle(event.currentTarget)
    }, { once: true })
    ele.addEventListener('transitioncancel', (event) => {
      this.clearStyle(event.currentTarget)
    }, { once: true })
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

  clearStyle(ele) {
    ['left', 'right', 'transition-property', 'transition-duration'].forEach(rule => {
      ele.style.removeProperty(rule)
    })
  }

  get duration() {
    let duration = this.data.get('duration')
    if (!duration) {
      duration = '1s'
    }
    return duration
  }

}

application.register('slide', SlideController)
window.SlideController = SlideController //todo debug, should remove
