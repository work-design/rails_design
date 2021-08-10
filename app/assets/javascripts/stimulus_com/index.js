import { Application, Controller } from 'stimulus'
import CheckboxController from './checkbox'
import './common'
import './count_down'
import './former'
import './hover'
import './input'
import './menu'
import './navbar'
import './notice'
import './picture'
import './show'
import './showcase'  // 点击小图，显示大图
import './slide'
import SlideYController from './slide_y'
import './sticky'
import './swipe'
import './taxon'
import './time'  // 时间格式根据浏览器时区等进行转化
import './tree'
import './tree_remote'
import './typer'
import './visit'

import './sortable' // dependent on sortable
import './choice' // Dependent on Choices.js

application.register('check', CheckController)
application.register('choice', ChoiceController)
application.register('common', CommonController)
application.register('count-down', CountDownController)
application.register('slide-y', SlideYController)

// Dependent on Bulma CSS
import './modal'
import './modal_show'
window.application = Application.start()

Controller.prototype.submit = function(form) {
  let evt = document.createEvent('Event')
  evt.initEvent('submit', true, true)
  form.dispatchEvent(evt)
}

Controller.prototype.csrfToken = function() {
  let meta = document.querySelector('meta[name=csrf-token]')
  return meta && meta.content
}

HTMLElement.prototype.controller = function(identifier) {
  return application.getControllerForElementAndIdentifier(this, identifier)
}
