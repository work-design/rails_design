import { Controller } from 'stimulus'

class SlideController extends Controller {

  connect() {
    console.debug('Slide Controller works!')
    this.element.addEventListener('transitionend', (event) => {
      this.clearStyle(event.target)
    })
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
        next.style.left = (this.element.clientWidth - pad) + 'px'
      }
    } else if (offset.x > 0) {  // offset.x > 0 表示向右滑动
      let prev = ele.previousElementSibling
      if (prev) {
        ele.style.left = pad + 'px'
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
          next.style.left = 0
          next.style.transitionProperty = 'left'
          next.style.transitionDuration = '1s'
          next.style.zIndex = 0
        }
        ele.style.right = this.element.clientWidth + 'px'
        ele.style.transitionProperty = 'right'
        ele.style.transitionDuration = '1s'
      } else if (offset.x > 0) {
        if (prev) {
          prev.style.right = 0
          prev.style.transitionProperty = 'right'
          prev.style.transitionDuration = '1s'
        }
        ele.style.left = this.element.clientWidth + 'px'
        ele.style.transitionProperty = 'left'
        ele.style.transitionDuration = '1s'
      }
    } else if (isMore === 0) {
      ele.style.right = 0
      ele.style.transitionProperty = 'right'
      ele.style.transitionDuration = '1s'
      if (next) {
        next.style.left = this.element.clientWidth + 'px'
        next.style.transitionProperty = 'left'
        next.style.transitionDuration = '1s'
      }
    }
  }

  clearStyle(ele) {
    ['left', 'right', 'transition-property', 'transition-duration'].forEach(rule => {
      ele.style.removeProperty(rule)
    })
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
