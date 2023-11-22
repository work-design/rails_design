import { Controller } from '@hotwired/stimulus'

export default class extends Controller {


  link() {
    this.element.querySelectorAll('[data-id]').forEach(el => {
      const src = document.getElementById(el.dataset.id)
      this.drawLine(src, el)
    })
  }

  drawLine(src, dest) {
    const src_x = src.getBoundingClientRect().right
    const src_y = src.getBoundingClientRect().top + src.clientHeight / 2
    const dest_x = dest.getBoundingClientRect().left
    const dest_y = dest.getBoundingClientRect().top + dest.clientHeight / 2
    const length = Math.sqrt(Math.pow(dest_x - src_x, 2), Math.pow(dest_y - src_y, 2))
    const rad = Math.atan2(dest_y - src_y, dest_x - src_x)
    const top = (src_y + dest_y) / 2
    const left = (src_x + dest_x) / 2 - length / 2

    const line = document.createElement('div')
    line.classList.add('draw-line')
    line.style.top = `${top}px`
    line.style.left = `${left}px`
    line.style.width = `${length}px`
    line.style.transform = `rotate(${rad}rad)`
    document.body.appendChild(line)
  }

}
