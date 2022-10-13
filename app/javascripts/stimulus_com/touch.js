import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    debug: Boolean
  }

  // data-action="touchstart->slide#start:passive"
  initStatus(event) {
    const ele = event.target.closest('[data-index]')
    window.xxx = ele
    this.left = ele.getBoundingClientRect().x
    console.log('zzzzzzz', this.left, ele.getBoundingClientRect())

    const touch = event.targetTouches[0]
    this.startPos = {
      x: touch.pageX,
      y: touch.pageY
    }
    this.startTime = new Date().getTime() // 毫秒，千分之一秒
  }

  // scale && scale !== 表示缩放了
  zoomed(event) {
    const result = event.changedTouches.length > 1 || (event.scale && event.scale !== 1)
    if (result) {
      console.error('是否缩放：', result)
    }
    return result
  }

  // 是否达到触发条件
  effective(pad, x = true) {
    const endTime = new Date().getTime()
    let isMore
    // 滑动距离是否超过元素宽度一半
    if (x) {
      isMore = pad > this.element.clientWidth / 2
    } else {
      isMore = pad > this.element.clientHeight / 2
    }
    console.debug('是否超过一半：', isMore)

    const speed = pad / (endTime - this.startTime) // 手势速度
    const isFast = speed > 0.1
    console.debug('手势速度：', isFast) // 大于 0.1

    return isMore || isFast
  }

  isHorizontal(pad, offset) {
    const isHorizontal = pad > Math.abs(offset.y)  // 1 左右滑动，0 上下滑动
    if (this.hasDebugValue && this.debugValue) {
      console.debug('是否左右滑动：', isHorizontal)
    }
    return isHorizontal
  }

  offset(event) {
    const touch = event.changedTouches[0]
    const offset = {
      x: touch.pageX - this.startPos.x,
      y: touch.pageY - this.startPos.y
    }
    if (this.hasDebugValue && this.debugValue) {
      console.debug(event.type, 'offset:', offset)
    }

    return offset
  }

  removeStyle(ele, styles) {
    styles.forEach(rule => {
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
