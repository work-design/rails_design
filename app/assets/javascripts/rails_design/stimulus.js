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

Controller.prototype.request = function(url, method, body) {
  fetch(url, {
    method: method,
    headers: {
      Accept: 'text/vnd.turbo-stream.html',
      'X-CSRF-Token': this.csrfToken()
    },
    body: body
  }).then(response => {
    return response.text()
  }).then(body => {
    Turbo.renderStreamMessage(body)
  })
}

Controller.prototype.get = function(url) {
  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'text/vnd.turbo-stream.html'
    }
  }).then(response => {
    return response.text()
  }).then(body => {
    Turbo.renderStreamMessage(body)
  })
}

HTMLElement.prototype.controller = function(identifier) {
  return application.getControllerForElementAndIdentifier(this, identifier)
}
