import { Application, Controller } from '@hotwired/stimulus'
export const application = Application.start()
window.application = application

Controller.prototype.submit = function(form) {
  const evt = document.createEvent('Event')
  evt.initEvent('submit', true, true)
  form.dispatchEvent(evt)
}

Controller.prototype.csrfToken = function() {
  const meta = document.querySelector('meta[name=csrf-token]')
  return meta && meta.content
}

HTMLElement.prototype.controller = function(identifier) {
  return application.getControllerForElementAndIdentifier(this, identifier)
}
