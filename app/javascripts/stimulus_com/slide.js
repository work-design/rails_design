import TouchController from './touch'
import { DateTime } from 'luxon'

// z-index: 0, 当前显示的图片/即将显示的图片，touch move 时动态设定；
// z-index: -1, 未显示的图片；
// left 的优先级高于 right
// transition 动画应在 touch end 的时候添加
export default class extends TouchController {
  static values = {
    delay: { type: Number, default: 0 } // 是否循环播放，延迟时间，单位为秒
  }
  static targets = ['container', 'dot']

  connect() {
    this.element.addEventListener('touchstart', event => {
      this.start(event)
    }, { passive: true })
    this.element.addEventListener('dragstart', event => {
      this.start(event)
    })

    const ele = this.containerTarget.firstElementChild
    ele.classList.add('is-active')
    if (this.hasDelayValue && this.delayValue > 0) {
      ele.style.left = 0
      this.mode(ele)
    }
  }

  mode(ele) {
    const next = this.next(ele)
    next.style.left = this.containerTarget.clientWidth + 'px'
    this.timerId = setTimeout(() => {
      this.direction = 'left'
      this.shiftLeft(ele)
      console.debug('Time:', DateTime.now().toFormat('TT'), 'Timer Id:', this.timerId)
    }, this.delayValue * 1000, ele)
  }

  start(event) {
    this.initStatus(event)
    // 对于自动轮播中的图片，当有 touch 动作时，暂停自动轮播
    if (this.timerId) {
      clearTimeout(this.timerId)
    }

    const ele = event.target.closest('[data-index]')
    this.left = ele.getBoundingClientRect().x
    ele.style.left = this.left + 'px'
    ele.classList.remove('transition')

    if (this.direction === 'left') {
      const next = this.next(ele)
      if (next) {
        next.style.left = this.containerTarget.clientWidth + this.left + 'px'
        next.classList.remove('transition')
      }
    } else if (this.direction === 'right') {
      const prev = this.prev(ele)
      if (prev) {
        prev.style.left = this.left - this.containerTarget.clientWidth + 'px'
        prev.classList.remove('transition')
      }
    }

    ele.removeEventListener('transitioncancel', this.beenCurrentAfter)
    ele.removeEventListener('transitionend', this.beenCurrentAfter)
  }

  // data-action="touchmove->slide#move:passive"
  // data-action="onmousemove->slide"
  move(event) {
    const ele = event.currentTarget
    console.debug('moved by element:', ele.dataset.index)
    if (this.zoomed(event)) {
      return
    }
    const offset = this.offset(event)
    const pad = Math.abs(offset.x)
    if (!this.isHorizontal(pad, offset)) {
      return
    }

    // offset.x < 0 表示向左滑动，反之 offset.x > 0 表示向右滑动
    ele.style.left = this.left + offset.x + 'px'
    let along
    if (offset.x < 0) {
      along = this.next(ele)
      if (along) {
        if (this.direction === 'left') {
          along.style.left = (this.containerTarget.clientWidth + this.left + offset.x) + 'px'
        } else if (this.direction === 'right') {
          along.style.left = (this.containerTarget.clientWidth + this.left + offset.x) + 'px'
        } else {
          along.style.left = (this.containerTarget.clientWidth + this.left + offset.x) + 'px'
        }
      }
    } else if (offset.x > 0) {
      along = this.prev(ele)
      if (along) {
        if (this.direction === 'left') {
          along.style.left = (this.containerTarget.clientWidth + this.left + offset.x) + 'px'
        } else if (this.direction === 'right') {
          along.style.left = (-this.containerTarget.clientWidth + this.left + offset.x) + 'px'
        } else {
          along.style.left = (-this.containerTarget.clientWidth + this.left + offset.x) + 'px'
        }
      }
    }

    if (along) {
      along.classList.add('is-active')
    }
  }

  // data-action="touchend->slide#end:passive"
  end(event) {
    if (this.zoomed(event)) {
      return
    }
    const ele = event.currentTarget
    const offset = this.offset(event)
    const pad = Math.abs(offset.x)

    if (!this.isHorizontal(pad, offset)) {
      console.debug('not scrolling', offset)
      this.rollback(offset, ele)
    } else {
      if (this.effective(pad)) {
        this.going(offset, ele)
      } else {
        if (this.direction === 'left') {
          this.shiftLeft(ele)
        } else if (this.direction === 'right') {
          this.shiftRight(ele)
        } else {
          this.rollback(offset, ele)
        }
      }
    }
  }

  // 执行翻页
  going(offset, ele) {
    if (offset.x < 0) {
      this.direction = 'left'
      this.shiftLeft(ele)
    }
    if (offset.x > 0) {
      if (this.direction === 'left') {
        this.direction = 'right'
        this.shiftRight(this.next(ele), ele)
      } else {
        this.direction = 'right'
        this.shiftRight(ele)
      }
    }
  }

  // 回退到之前的状态
  rollback(offset, ele) {
    const next = this.next(ele)

    if (offset.x < 0 && next) {
      this.shiftRight(next)
    }

    const prev = this.prev(ele)
    if (offset.x > 0 && prev) {
      this.shiftLeft(prev)
    }
  }

  // ele 向左滑出
  shiftLeft(left, right = this.next(left)) {
    if (right) {
      left.classList.add('transition')
      this.beenCurrent(left)

      right.classList.add('transition')
      this.toCurrent(right)
    } else {
      left.classList.add('transition')
      this.toCurrent(left)
    }
  }

  // ele 向右滑出
  shiftRight(right, left = this.prev(right)) {
    if (left) {
      left.classList.add('transition')
      this.toCurrent(left)

      right.classList.add('transition')
      this.beenCurrent(right, this.containerTarget.clientWidth + 'px')
    } else {
      right.classList.add('transition')
      this.toCurrent(right)
    }
  }

  // 不再展示
  beenCurrent(ele, left = -this.containerTarget.clientWidth + 'px') {
    console.debug('add transition event beenCurrentAfter for been', ele.dataset.index)
    ele.style.left = left
    if (this.hasDotTarget) {
      const dot = this.dotTarget.children[ele.dataset.index]
      dot.classList.replace('has-text-white', 'has-text-black')
    }
    ele.addEventListener('transitionend', this.beenCurrentAfter, { once: true })
    ele.addEventListener('transitioncancel', this.beenCurrentAfter, { once: true })
  }

  // this become event.target
  beenCurrentAfter(event) {
    const ele = event.currentTarget
    console.debug(ele.dataset.index, 'been Current After', event.type)
    ele.classList.remove('is-active')

    const controller = ele.closest('[data-controller~=slide]').controller('slide')
    controller.direction = null
    if (!controller) {
      return
    }
    if (event.type === 'transitionend') {
      //ele.style.left = 0
      ele.classList.remove('transition')
      ele.removeEventListener('transitioncancel', controller.beenCurrentAfter)
    } else if (event.type === 'transitioncancel') {
      ele.removeEventListener('transitionend', controller.beenCurrentAfter)
    }
  }

  // 即将展示
  toCurrent(ele) {
    ele.classList.add('is-active')
    ele.style.left = 0

    if (this.hasDotTarget) {
      const dot = this.dotTarget.children[ele.dataset.index]
      dot.classList.replace('has-text-black', 'has-text-white')
    }
    console.debug('add transition event toCurrentAfter for to', ele.dataset.index)
    ele.addEventListener('transitionend', this.toCurrentAfter, { once: true })
    ele.addEventListener('transitioncancel', this.toCurrentAfter, { once: true })
  }

  toCurrentAfter(event) {
    const ele = event.currentTarget
    console.debug(ele.dataset.index, 'to Current after', event.type)
    const controller = ele.closest('[data-controller~=slide]').controller('slide')
    controller.direction = null
    if (!controller) {
      return
    }

    if (event.type === 'transitionend') {
      //ele.style.left = 0
      ele.classList.remove('transition')
      if (controller.hasDelayValue && controller.delayValue > 0) {
        controller.mode(ele)
      }
      ele.removeEventListener('transitioncancel', controller.toCurrentAfter)
    } else if (event.type === 'transitioncancel') {
      ele.removeEventListener('transitionend', controller.toCurrentAfter)
    }
  }

  next(ele) {
    if (this.hasDelayValue) {
      return ele.nextElementSibling || this.containerTarget.firstElementChild
    } else {
      return ele.nextElementSibling
    }
  }

  prev(ele) {
    if (this.hasDelayValue) {
      return ele.previousElementSibling || this.containerTarget.lastElementChild
    } else {
      return ele.previousElementSibling
    }
  }

}
