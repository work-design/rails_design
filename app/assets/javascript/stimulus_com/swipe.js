import TouchController from './touch'

class SwipeController extends TouchController {
  static targets = ['open']

  connect() {
    console.debug('Swipe Controller works!')
  }

  start(event) {
    let touch = event.targetTouches[0]
    this.startPos = {
      x: touch.pageX,
      y: touch.pageY
    }
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
      let styles = {
        width: `${Math.abs(offset.x)}px`
      }
      this.openTarget.style.removeProperty('display')
      Object.assign(this.openTarget.style, styles)
    } else if (isScrolling === 0 && offset.x > 0) {
      let styles = {
        width: 0
      }
      Object.assign(this.openTarget.style, styles)
    }
  }

  end(event) {
    let styles = {
      width: '150px',
      'transition-property': 'width'
    }
    Object.assign(this.openTarget.style, styles)
  }

}

application.register('swipe', SwipeController)
