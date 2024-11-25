import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

  connect() {
    this.ctx = this.element.getContext('2d')
    this.clear()
  }

  clear() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
  }

  draw(x, y, isDown) {
    if (isDown) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }

  // mousedown
  down(e) {
    draw(e.offsetX, e.offsetY, true)
  }


  move(e) {
    draw(e.offsetX, e.offsetY, true)
  }

  up() {
    draw(0, 0, false)
  }

}