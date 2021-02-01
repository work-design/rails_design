import TouchController from './touch'

// z-index: 0, 当前显示的图片；
// z-index: -1, 即将显示的图片，touch move 时动态设定；
// z-index: -2, 未显示的图片；
class SlideController extends TouchController {

  connect() {
    console.debug('Slide Controller works!')
    this.element.addEventListener('touchstart', (event) => {
      this.start(event)
    }, { passive: true })
  }

  // data-action="touchmove->slide#move:passive"
  move(event) {
    let ele = event.currentTarget
    console.debug('move start', ele.dataset.index)
    if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) {  // scale && scale !== 表示缩放了
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
    let ele = event.currentTarget
    let next = ele.nextElementSibling
    let prev = ele.previousElementSibling
    if (event.changedTouches.length > 1 || event.scale && event.scale !== 1) {
      return
    }
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
          this.nearLeft(next)
          next.style.zIndex = 0
          this.toCurrent(next)

          this.farRight(ele)
          ele.style.zIndex = -1
          this.beenCurrent(ele)
        }
      } else if (offset.x > 0) {
        if (prev) {
          this.nearRight(prev)
          prev.style.zIndex = 0
          this.toCurrent(prev)

          this.farLeft(ele)
          ele.style.zIndex = -1
          this.beenCurrent(ele)
        }
      }
    } else if (isMore === 0) {
      if (offset.x < 0) {
        if (next) {
          this.nearRight(ele)
          this.toCurrent(ele)

          this.farLeft(next)
          this.beenCurrent(next)
        }
      } else if (offset.x > 0) {
        if (prev) {
          this.nearLeft(ele)
          this.toCurrent(ele)

          this.farRight(prev)
          this.beenCurrent(prev)
        }
      }
    }
  }

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

  toCurrent(ele) {
    ele.addEventListener('transitionend', (event) => {
      this.clearStyle(event.currentTarget)
    }, { once: true })
    ele.addEventListener('transitioncancel', (event) => {
      this.clearStyle(event.currentTarget)
    }, { once: true })
  }

  nearLeft(ele) {
    ele.style.left = 0
    ele.style.transitionProperty = 'left'
    ele.style.transitionDuration = this.duration
  }

  nearRight(ele) {
    ele.style.right = 0
    ele.style.transitionProperty = 'right'
    ele.style.transitionDuration = this.duration
  }

  farRight(ele) {
    ele.style.right = this.element.clientWidth + 'px'
    ele.style.transitionProperty = 'right'
    ele.style.transitionDuration = this.duration
  }

  farLeft(ele) {
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
window.SlideController = SlideController
