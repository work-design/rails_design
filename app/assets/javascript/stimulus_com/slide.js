import { Controller } from 'stimulus'

// z-index: 0, 当前显示的图片；
// z-index: -1, 即将显示的图片，touch move 时动态设定；
// z-index: -2, 未显示的图片；

class SlideController extends Controller {

  connect() {
    console.debug('Slide Controller works!')
  }

  offset(touch) {
    let offset = {
      x: touch.pageX - this.startPos.x,
      y: touch.pageY - this.startPos.y
    }
    console.debug('offset', offset)

    return offset
  }

  // data-action="touchstart->slide#start:passive"
  start(event) {
    let touch = event.targetTouches[0]
    this.startPos = {
      x: touch.pageX,
      y: touch.pageY
    }
    this.startTime = new Date().getTime() // 毫秒，千分之一秒
  }

  // data-action="touchmove->slide#move:passive"
  move(event) {
    let ele = event.currentTarget
    console.log('move start', ele.dataset.index)
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
          next.addEventListener('transitionend', (event) => { this.clearStyle(event.currentTarget) }, { once: true })

          this.farRight(ele)
          ele.style.zIndex = -1
          ele.addEventListener('transitionend', (event) => {
            this.clearStyle(event.currentTarget)
            event.currentTarget.style.zIndex = -2
          }, { once: true })
        }
      } else if (offset.x > 0) {
        if (prev) {
          this.nearRight(prev)
          prev.style.zIndex = 0
          prev.addEventListener('transitionend', (event) => {
            this.clearStyle(event.currentTarget)
          }, { once: true })

          this.farLeft(ele)
          ele.style.zIndex = -1
          ele.addEventListener('transitionend', (event) => {
            this.clearStyle(event.currentTarget)
            event.currentTarget.style.zIndex = -2
          }, { once: true })
        }
      }
    } else if (isMore === 0) {
      if (offset.x < 0) {
        if (next) {
          this.nearRight(ele)
          ele.addEventListener('transitionend', (event) => {
            this.clearStyle(event.currentTarget)
          }, { once: true })

          this.farLeft(next)
          next.addEventListener('transitionend', (event) => {
            this.clearStyle(event.currentTarget)
            event.currentTarget.style.zIndex = -2
          }, { once: true })
        }
      } else if (offset.x > 0) {
        if (prev) {
          this.nearLeft(ele)
          ele.addEventListener('transitionend', (event) => {
            this.clearStyle(event.currentTarget)
          }, { once: true })

          this.farRight(prev)
          prev.addEventListener('transitionend', (event) => {
            this.clearStyle(event.currentTarget)
            event.currentTarget.style.zIndex = -2
          }, { once: true })
        }
      }
    }
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

  get startPos() {
    let r = this.data.get('startPos').split(',')
    return {
      x: parseFloat(r[0]),
      y: parseFloat(r[1])
    }
  }

  set startPos(pos) {
    this.data.set('startPos', [pos.x, pos.y].join(','))
  }

  get startTime() {
    return this.data.get('startTime')
  }

  set startTime(time) {
    this.data.set('startTime', time)
  }

}

application.register('slide', SlideController)
