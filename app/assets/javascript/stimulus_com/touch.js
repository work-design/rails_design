import { Controller } from 'stimulus'

export default class TouchController extends Controller {

  // data-action="touchstart->slide#start:passive"
  start(event) {
    let touch = event.targetTouches[0]
    this.startPos = {
      x: touch.pageX,
      y: touch.pageY
    }
    this.startTime = new Date().getTime() // 毫秒，千分之一秒
  }

  // scale && scale !== 表示缩放了
  zoomed(event) {
    return event.changedTouches.length > 1 || (event.scale && event.scale !== 1)
  }

  xx(pad) {
    let endTime = new Date().getTime()
    let isMore = pad > this.element.clientWidth / 2 ? 1 : 0  // 滑动距离是否超过元素宽度一半
    let speed = pad / (endTime - this.startTime)  // 手势速度
    console.debug('手势速度', speed)  // 大于 0.1
  }

  offset(touch) {
    let offset = {
      x: touch.pageX - this.startPos.x,
      y: touch.pageY - this.startPos.y
    }
    console.debug('offset', offset)

    return offset
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
