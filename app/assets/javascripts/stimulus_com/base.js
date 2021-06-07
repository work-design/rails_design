import { Application, Controller } from 'stimulus'
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
