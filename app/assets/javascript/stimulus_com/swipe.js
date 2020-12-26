import { Controller } from 'stimulus'

class SwipeController extends Controller {
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
    if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) {
      return
    }
    let touch = event.targetTouches[0]
    let offset = {
      x: touch.pageX - this.startPos.x,
      y: touch.pageY - this.startPos.y
    }
    console.debug(offset)
    let isScrolling = Math.abs(offset.x) < Math.abs(offset.y) ? 1 : 0
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

}

application.register('swipe', SwipeController)
