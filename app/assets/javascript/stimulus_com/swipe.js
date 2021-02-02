import TouchController from './touch'

class SwipeController extends TouchController {
  static targets = ['open']

  connect() {
    console.debug('Swipe Controller works!')
  }

  // data-action="touchstart->slide#start:passive"
  start(event) {
    let touch = event.targetTouches[0]
    this.startPos = {
      x: touch.pageX,
      y: touch.pageY
    }
    this.startTime = new Date().getTime() // 毫秒，千分之一秒
    this.width = this.element.clientWidth
  }

  // data-action="touchmove->swipe#left touchstart->swipe#start"
  left(event) {
    if (this.zoomed(event)) {
      return
    }
    let offset = this.offset(event.targetTouches[0])
    let pad = Math.abs(offset.x)
    let isScrolling = pad < Math.abs(offset.y) ? 1 : 0 // 1 上下滚动，0 左右滑动
    if (isScrolling !== 0) {
      return
    }

    if (isScrolling === 0 && offset.x < 0) {
      this.openTarget.style.width = `${pad}px`
      let movePad = this.openTarget.clientWidth >= pad ? pad : this.openTarget.clientWidth
      let styles = {
        width: `${this.width + movePad}px`,
        left: `-${movePad}px`
      }
      Object.assign(this.element.style, styles)
    } else if (isScrolling === 0 && offset.x > 0) {
      let x = this.right - offset.x
      let styles = {
        right: `${x > 0 ? x : 0}px`
      }
      Object.assign(this.element.style, styles)
    }
  }

  end(event) {
    // let styles = {
    //   width: '150px',
    //   'transition-property': 'width'
    // }
    this.openTarget.style.width = `${this.openTarget.clientWidth}px`
    // Object.assign(this.element.style, styles)
  }

  get width() {
    return parseFloat(this.data.get('width'))
  }

  set width(value) {
    this.data.set('width', value)
  }

}

application.register('swipe', SwipeController)
