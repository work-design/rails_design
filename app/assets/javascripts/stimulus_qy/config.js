import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    params: Object
  }
  static targets = ['load']

  connect() {
    wx.agentConfig()
  }

}
