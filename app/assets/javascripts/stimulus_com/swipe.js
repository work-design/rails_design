import TouchController from './touch'

export default class extends TouchController {
  static targets = ['open']

  connect() {
    console.debug('connected:', this.identifier)
  }

  // data-action="touchstart->swipe#start:passive"
  start(event) {
    let touch = event.targetTouches[0]
    this.startPos = {
      x: touch.pageX,
      y: touch.pageY
    }
    this.startTime = new Date().getTime() // 毫秒，千分之一秒
    this.barWidth = this.element.clientWidth
    this.swiperWidth = this.openTarget.clientWidth
  }

  // data-action="touchmove->swipe#move touchstart->swipe#move"
  move(event) {
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
      this.openTarget.style.width = `${this.swiperWidth + pad}px`
      let styles = {
        width: `${this.barWidth - this.swiperWidth + this.openTarget.clientWidth}px`,
        left: `-${this.openTarget.clientWidth}px`
      }
      Object.assign(this.element.style, styles)
    } else if (isScrolling === 0 && offset.x > 0) {
      let x = pad < this.swiperWidth ? this.swiperWidth - pad : 0
      this.openTarget.style.width = `${x}px`
      let styles = {
        width: `${this.barWidth - (pad < this.swiperWidth ? pad : this.swiperWidth)}px`,
        left: `-${x}px`
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

  get leftPos() {
    let left = this.element.style.left.replace(/px$/, '')
    return parseFloat(left)
  }

  get barWidth() {
    return parseFloat(this.data.get('barWidth'))
  }

  set barWidth(value) {
    this.data.set('barWidth', value)
  }

  get swiperWidth() {
    return parseFloat(this.data.get('swiperWidth'))
  }

  set swiperWidth(value) {
    this.data.set('swiperWidth', value)
  }

}
